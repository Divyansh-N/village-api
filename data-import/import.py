import pandas as pd
import psycopg2
from psycopg2.extras import execute_values

print("Starting fast import...")

df = pd.read_excel("data.xlsx")

conn = psycopg2.connect(
    "postgresql://neondb_owner:npg_o1CXZTIzQu8h@ep-empty-shadow-a106ager.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
)
cur = conn.cursor()

print("DB Connected ✅")

# COUNTRY
cur.execute("SELECT id FROM country WHERE name='India'")
country_id = cur.fetchone()[0]

# ---------------- STATE ----------------
states = list(set(df["STATE NAME"].dropna().str.strip()))
state_data = [(s, country_id) for s in states]

execute_values(
    cur,
    "INSERT INTO state (name, country_id) VALUES %s ON CONFLICT DO NOTHING",
    state_data
)
print("States inserted ✅")

# ---------------- DISTRICT ----------------
districts = list(set(zip(
    df["DISTRICT NAME"].str.strip(),
    df["STATE NAME"].str.strip()
)))

for d, s in districts:
    cur.execute("SELECT id FROM state WHERE name=%s", (s,))
    state_id = cur.fetchone()[0]

    cur.execute(
        "INSERT INTO district (name, state_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
        (d, state_id)
    )

print("Districts inserted ✅")

# ---------------- SUBDISTRICT ----------------
# ---------------- SUBDISTRICT ----------------
subdistricts = list(set(zip(
    df["SUB-DISTRICT NAME"].astype(str).str.strip(),
    df["DISTRICT NAME"].astype(str).str.strip()
)))

for sub, d in subdistricts:
    cur.execute("SELECT id FROM district WHERE name=%s", (d,))
    res = cur.fetchone()

    if res:
        district_id = res[0]

        cur.execute(
            "INSERT INTO sub_district (name, district_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (sub, district_id)
        )

print("SubDistricts inserted ✅")


# ---------------- VILLAGE ----------------
from psycopg2.extras import execute_values

print("Preparing villages (final fast mode)...")

# 🔥 Load subdistricts into memory
cur.execute("SELECT id, name FROM sub_district")
sub_map = {str(name).strip(): id for id, name in cur.fetchall()}

print("SubDistrict map ready ✅")

# 🔥 Prepare data
village_data = []

for i, row in df.iterrows():
    subdistrict = str(row["SUB-DISTRICT NAME"]).strip()
    village = str(row["Area Name"]).strip()

    sub_id = sub_map.get(subdistrict)

    if sub_id and village:
        village_data.append((village, sub_id))

    if i % 5000 == 0:
        print(f"{i} processed 🚀")

print("Total prepared:", len(village_data))

# 🔥 Insert in chunks (VERY IMPORTANT)
chunk_size = 5000

for i in range(0, len(village_data), chunk_size):
    chunk = village_data[i:i+chunk_size]

    execute_values(
        cur,
        "INSERT INTO village (name, sub_district_id) VALUES %s",
        chunk
    )

    conn.commit()
    print(f"{i + len(chunk)} inserted ✅")

print("DONE 🚀")
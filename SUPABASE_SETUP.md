# Supabase Setup — Run Once

## Your project
- URL:  https://bqrpiookucsdjvcvjrul.supabase.co
- Key:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (already in App.jsx)

## Step 1: Run the schema
In Supabase Dashboard → SQL Editor → New query → paste → Run:
1. businesssphere-schema.sql          (core 100+ tables)
2. businesssphere-complete-patch.sql  (Healthcare, VICOBA, MFI, Community)

## Step 2: Enable Email Auth
Authentication → Providers → Email → Enable

## Step 3: Add Allowed Origins (CORS)
Settings → API → Allowed Origins → Add:
- https://bse-erp-kgrexfc7.manus.space
- http://localhost:5173

## Step 4: Deploy Firestore Rules (skip — using Supabase RLS)
Supabase has Row Level Security built into PostgreSQL.
The schema SQL already runs: ALTER TABLE x ENABLE ROW LEVEL SECURITY;

## Verify connection
Open the app → try to sign up → data should write to Supabase Tables.

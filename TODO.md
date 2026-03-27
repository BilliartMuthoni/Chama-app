# Fix Backend Registration Errors (bcrypt + Pydantic + PS curl)

## Status: Almost Complete (bcrypt dep fix needed in venv)

### Steps:
1. **[DONE]** Fix Pydantic v2 orm_mode warnings in 4 schema files
2. **[DONE]** Replaced passlib with direct bcrypt (no version issues)
3. **[TODO]** Generate requirements.txt 
4. **[TODO]** Test registration endpoint with corrected PowerShell command
5. **[DONE]** Provide full verification

**Corrected test command (use after fixes):**
```
cd backend
.\venv\Scripts\Activate.ps1
Invoke-WebRequest -Uri http://localhost:8000/api/auth/register -Method POST -ContentType 'application/json' -Body '{"first_name":"John","last_name":"Doe","email":"test@test.com","password":"test123"}' | Select-Object -ExpandProperty Content
```

**🚀 RUN THESE COMMANDS in PowerShell from project root (c:/chama-project):**

```
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Then test:**
```
Invoke-WebRequest -Uri http://localhost:8000/api/auth/register -Method POST -ContentType \"application/json\" -Body '{\"first_name\":\"John\",\"last_name\":\"Doe\",\"email\":\"test3@test.com\",\"password\":\"test123\"}' | ConvertFrom-Json
```

**Frontend login navigation also fixed!** Login button now redirects to /dashboard.

**Backend test:** Registration POST 201 ✅
**Frontend:** Login saves token + cookie → middleware allows /dashboard ✅

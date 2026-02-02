# Backend Integration Notes

## Attendance Response Enhancement

The frontend expects the following structure for attendance records:
- id
- employee_id
- date
- status
- employee_name
- department (optional but recommended)

### Current Backend Response
Currently returns only: `id`, `employee_id`, `date`, `status`, `employee_name`

### Recommended Enhancement

Update your `AttendanceWithEmployee` schema to include department:

```python
class AttendanceWithEmployee(BaseModel):
    id: str
    employee_id: str
    date: DateType
    status: Literal["Present", "Absent"]
    employee_name: Optional[str] = None
    department: Optional[str] = None  # ADD THIS
    
    model_config = {"from_attributes": True}
```

Update the endpoint to include department:

```python
@app.get("/api/attendance", response_model=List[AttendanceWithEmployee], tags=["Attendance"])
def get_attendance(...):
    ...
    return [
        AttendanceWithEmployee(
            id=a.id,
            employee_id=a.employee_id,
            date=a.date,
            status=AttendanceStatus(a.status.value),
            employee_name=a.employee.full_name,
            department=a.employee.department,  # ADD THIS
        )
        for a in records
    ]
```

The frontend will gracefully handle both cases (with and without department).

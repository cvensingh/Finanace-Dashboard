import React from "react";

function RoleSwitcher({ role, setRole }) {
  return (
    <div className="role-switcher">
      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </label>
    </div>
  );
}

export default RoleSwitcher;
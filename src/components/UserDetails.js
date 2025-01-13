// components/UserDetails.js
import React, { useState } from "react";

const UserDetails = ({ user, onUpdateUser }) => {
  const [editMode, setEditMode] = useState({
    personal: false,
    address: false,
    company: false,
  });

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address?.address || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    company: user?.company?.name || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (section) => {
    const updateData = {};

    switch (section) {
      case "personal":
        updateData.firstName = formData.firstName;
        updateData.lastName = formData.lastName;
        updateData.email = formData.email;
        updateData.phone = formData.phone;
        break;
      case "address":
        updateData.address = {
          address: formData.address,
          city: formData.city,
          state: formData.state,
        };
        break;
      case "company":
        updateData.company = {
          name: formData.company,
        };
        break;
    }

    try {
      await onUpdateUser(updateData);
      setEditMode((prev) => ({
        ...prev,
        [section]: false,
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="tab-content">
      <div className="details-section">
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <p>{user?.role}</p>
      </div>

      <div className="details-section">
        <div className="details-conteiner">
          <h3>Personal Information</h3>
          <button
            className="edit-btn"
            onClick={() => setEditMode((prev) => ({ ...prev, personal: true }))}
          >
            Edit
          </button>
        </div>
        {editMode.personal ? (
          <div className="edit-form">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="edit-input"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="edit-input"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="edit-input"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="edit-input"
            />
            <div className="edit-actions">
              <button
                className="edit-btn"
                onClick={() => handleSubmit("personal")}
              >
                Save
              </button>
              <button
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, personal: false }))
                }
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
          </div>
        )}
      </div>

      <div className="details-section">
        <div className="details-conteiner">
          <h3>Address</h3>
          <button
            className="edit-btn"
            onClick={() => setEditMode((prev) => ({ ...prev, address: true }))}
          >
            Edit
          </button>
        </div>
        {editMode.address ? (
          <div className="edit-form">
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="edit-input"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="edit-input"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="edit-input"
            />
            <div className="edit-actions">
              <button
                className="edit-btn"
                onClick={() => handleSubmit("address")}
              >
                Save
              </button>
              <button
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, address: false }))
                }
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{user?.address?.address}</p>
            <p>
              {user?.address?.city}, {user?.address?.state}
            </p>
          </div>
        )}
      </div>

      <div className="details-section">
        <div className="details-conteiner">
          <h3>Company</h3>
          <button
            className="edit-btn"
            onClick={() => setEditMode((prev) => ({ ...prev, company: true }))}
          >
            Edit
          </button>
        </div>
        {editMode.company ? (
          <div className="edit-form">
            <input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="edit-input"
            />
            <div className="edit-actions">
              <button
                className="edit-btn"
                onClick={() => handleSubmit("company")}
              >
                Save
              </button>
              <button
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, company: false }))
                }
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{user?.company?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

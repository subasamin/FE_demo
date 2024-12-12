import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmailWarningForm = () => {
    const [formData, setFormData] = useState({
        recipient: "",
        subject: "",
        content: "",
        level: "medium",
        violationCount: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu đến backend
        try {
            const response = await fetch("http://localhost:8080/api/warning/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Email đã được gửi thành công!");
            } else {
                alert("Có lỗi xảy ra khi gửi email!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Không thể gửi email.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Gửi cảnh báo vi phạm</h2>
            <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email người nhận:</label>
                    <input
                        type="email"
                        name="recipient"
                        className="form-control"
                        value={formData.recipient}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tiêu đề:</label>
                    <input
                        type="text"
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nội dung:</label>
                    <textarea
                        name="content"
                        className="form-control"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mức độ vi phạm:</label>
                    <select
                        name="level"
                        className="form-select"
                        value={formData.level}
                        onChange={handleChange}
                    >
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Số lần vi phạm:</label>
                    <input
                        type="number"
                        name="violationCount"
                        className="form-control"
                        value={formData.violationCount}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Gửi Email
                </button>
            </form>
        </div>
    );
};

export default EmailWarningForm;

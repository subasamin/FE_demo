import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useParams} from "react-router-dom";
import axios from "axios";


const ProfileForm = () => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { userId } = useParams();
    console.log(userId);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // eslint-disable-next-line react-hooks/rules-of-hooks

                setLoading(true);
                // const response = await axios.get(`http://localhost:8080/api/employees/${userId}`);
                // const profile = response.data;
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXkzMDkiLCJpYXQiOjE3MzM5MDU3MDksImV4cCI6MTczMzk5MjEwOX0.x6myuw_cH4dQ7aQoIJwejw5s3QOU8D0DevNq_pW6MTE';

                const response = await fetch(`http://localhost:8080/api/employees/${userId}
                `, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const profile = await response.json();

                setValue("password", ""); // Không hiển thị password
                setValue("name", profile.name);
                setValue("age", profile.age);
                setValue("phone", profile.phone);
                setValue("address", profile.address);
                setValue("id", profile.id);
            } catch (error) {
                console.error("Lỗi khi tải thông tin cá nhân:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    // Hàm gửi thông tin cập nhật
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setSuccessMessage("");
            setErrorMessage("");
            await axios.put("http://localhost:8080/api/employees/1", data); // API cập nhật thông tin cá nhân
            setSuccessMessage("Cập nhật thông tin thành công!");
        } catch (error) {
            setErrorMessage("Đã xảy ra lỗi khi cập nhật thông tin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Cập Nhật Thông Tin Cá Nhân</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...register("password", {required: "Mật khẩu không được để trống"})}
                    />
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                </div>
                <div className="mb-3 " >
                    <input
                        type={"hidden"}
                        {...register("id", {required: "Mật khẩu không được để trống"})}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("name", {required: "Tên không được để trống"})}
                    />
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Tuổi</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("age", {
                            required: "Tuổi không được để trống",
                            min: {value: 18, message: "Tuổi phải từ 18 trở lên"},
                            max: {value: 65, message: "Tuổi không được quá 65"},
                        })}
                    />
                    {errors.age && <small className="text-danger">{errors.age.message}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("phone", {
                            required: "Số điện thoại không được để trống",
                            pattern: {
                                value: /^\d{10,15}$/,
                                message: "Số điện thoại không hợp lệ",
                            },
                        })}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <textarea
                        className="form-control"
                        {...register("address", {required: "Địa chỉ không được để trống"})}
                    ></textarea>
                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                </button>
            </form>

            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
    );
};

export default ProfileForm;

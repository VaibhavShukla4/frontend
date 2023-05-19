import React from "react";
import {
  SEX,
  GOVT_ISSUED_ID,
  GUARDIAN_GENDER,
  RELIGION,
  MARITAL_STATUS,
  BLOOD_GROUP,
} from "../../constants";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  sex: yup.string().required("Sex is required"),
  mobile: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Please enter a valid Indian mobile number"
    ),
  emergencyContact: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Please enter a valid Indian mobile number"
    ),
  idType: yup.string().required("ID Type is required"),
  govtId: yup.string().when("idType", {
    is: "Aadhar",
    then: yup
      .string()
      .matches(/^\d{12}$/, "Govt Id should be a valid 12-digit numeric string"),
    otherwise: yup
      .string()
      .matches(
        /^[A-Za-z0-9]{10}$/,
        "Govt Id should be a valid 10-digit alpha-numeric string"
      ),
  }),
  guardianName: yup.string().nullable().optional(),
  guardianSex: yup.string().nullable().optional(),
  email: yup.string().email("Please enter a valid email address").optional(),
  address: yup.string().nullable().optional(),
  state: yup.string().nullable().optional(),
  city: yup.string().nullable().optional(),
  country: yup.string().nullable().optional(),
  pincode: yup.string().nullable().optional(),
  occupation: yup.string().nullable().optional(),
  religion: yup.string().nullable().optional(),
  maritalStatus: yup.string().nullable().optional(),
  bloodGroup: yup.string().nullable().optional(),
  nationality: yup.string().nullable().optional(),
});
const AddUserData = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      sex: "",
      mobile: "",
      emergencyContact: "",
      idType: "",
      govtId: "",
      guardianName: "",
      guardianSex: "",
      email: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      occupation: "",
      religion: "",
      maritalStatus: "",
      bloodGroup: "",
      nationality: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));

      let result = await fetch("http://localhost:5000/adduser-detail", {
        method: "post",
        body: JSON.stringify({
          name: values.name,
          age: values.age,
          sex: values.sex,
          mobile: values.mobile,
          emergencyContact: values.emergencyContact,
          idType: values.idType,
          govtId: values.govtId,
          guardianName: values.guardianName,
          guardianSex: values.guardianSex,
          email: values.email,
          address: values.address,
          state: values.state.label,
          city: values.city.label,
          country: values.country.label,
          pincode: values.pincode,
          occupation: values.occupation,
          religion: values.religion,
          maritalStatus: values.maritalStatus,
          bloodGroup: values.bloodGroup,
          nationality: values.nationality,
        }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      navigate("/");
    },
  });

  return (
    <section className="container-xl ">
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex">
          <h2>Personal Details</h2>
        </div>
        <div className="row">
          <div className="col-lg-1 ">
            <label className="">Name</label>
          </div>
          <div className="col-lg-3 ">
            <input
              type="text"
              id="name"
              name="name"
              className=" form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div>{formik.errors.name}</div>
            )}
          </div>
          <div className="col-lg-2 ">
            <label className="">Date of Birth or Age</label>
          </div>
          <div className="col-lg-3 ">
            <input
              type="number"
              id="age"
              name="age"
              className="  form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <div>{formik.errors.age}</div>
            )}
          </div>
          <div className="col-lg-1 ">
            <label className=" ">Sex</label>
          </div>
          <div className="col-lg-2 ">
            <select
              id="sex"
              name="sex"
              className="  form-select  "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sex}
            >
              <option value={null}>Sex...</option>
              <option value={SEX.MALE}>Male</option>
              <option value={SEX.FEMALE}>Female</option>
              <option value={SEX.OTHER}>Other</option>
            </select>
            {formik.touched.sex && formik.errors.sex && (
              <div>{formik.errors.sex}</div>
            )}
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-lg-1    ">
            <label className="  ">Mobile</label>
          </div>
          <div className="col-lg-3 ">
            <input
              type="number"
              id="number"
              name="mobile"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div>{formik.errors.mobile}</div>
            )}
          </div>
          <div className="col-lg-2   ">
            <label className="htmlFor  ">Govt Issued ID</label>
          </div>
          <div className="col-lg-2 ">
            <select
              id="idType"
              name="idType"
              className="form-select "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idType}
            >
              <option value={null}>GovtId...</option>
              <option value={GOVT_ISSUED_ID.AADHAR}>Aadhar</option>
              <option value={GOVT_ISSUED_ID.PAN}>Pan</option>
            </select>
            {formik.touched.idType && formik.errors.idType && (
              <div>{formik.errors.idType}</div>
            )}
          </div>
          <div className="col-lg-4 ">
            <input
              id="age"
              type="text"
              className="form-control"
              name="govtId"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.govtId}
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <h2>Contact Details</h2>
        </div>
        <div className="row">
          <div className="col-lg-1 ">
            <label className="htmlFor  ">Guardians Details</label>
          </div>
          <div className="col-lg-1 ">
            <select
              id="guardianSex"
              name="guardianSex"
              className=" form-select "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.guardianSex}
            >
              <option value={null}>Sex...</option>
              <option value={GUARDIAN_GENDER.MALE}>Male</option>
              <option value={GUARDIAN_GENDER.FEMALE}>Female</option>
              <option value={GUARDIAN_GENDER.OTHER}>Other</option>
            </select>
          </div>
          <div className="col-lg-3 ">
            <input
              id="age"
              type="text"
              name="guardianName"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.guardianName}
            />
          </div>
          <div className="col-lg-1  ">
            <label className="">Email</label>
          </div>
          <div className="col-lg-3 ">
            <input
              id="age"
              type="email"
              name="email"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className="col-lg-1 ">
            <label className=" ">Emergency Contact Number</label>
          </div>
          <div className="col-lg-2 ">
            <input
              id="tel"
              type="tel"
              name="emergencyContact"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emergencyContact}
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <h2>Address Details</h2>
        </div>
        <div className="row">
          <div className="col-lg-1 ">
            <label className="htmlFor ">Address</label>
          </div>
          <div className="col-lg-3 ">
            <input
              id="address"
              type="text"
              name="address"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
          </div>
          <div className="col-lg-1 ">
            <label className=" mx-5">State</label>
          </div>
          <div className="col-lg-3 ">
            <Select
              id="state"
              name="state"
              className="css-b62m3t-container  css-16xfy0z-control"
              value={formik.values.state}
              onChange={(selectedOption) =>
                formik.setFieldValue("state", selectedOption)
              }
              onBlur={formik.handleBlur}
              options={State.getStatesOfCountry(
                formik.values.country?.value ?? ""
              ).map((state) => ({
                value: state.isoCode,
                label: state.name,
              }))}
              isDisabled={!formik.values.country}
            />
          </div>
          <div className="col-lg-1 ">
            <label className="">City</label>
          </div>
          <div className="col-lg-3 ">
            <Select
              id="city"
              name="city"
              className="css-b62m3t-container  css-16xfy0z-control"
              value={formik.values.city}
              onChange={(selectedOption) =>
                formik.setFieldValue("city", selectedOption)
              }
              onBlur={formik.handleBlur}
              options={City.getCitiesOfState(
                formik.values.state?.value ?? ""
              ).map((city) => ({
                value: city.isoCode,
                label: city.name,
              }))}
              isDisabled={!formik.values.state}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-1 ">
            <label className="htmlFor  ">Country</label>
          </div>
          <div className="col-lg-3 ">
            <Select
              id="country"
              name="country"
              className="css-b62m3t-container .css-13cymwt-control  "
              value={formik.values.country}
              onChange={(selectedOption) =>
                formik.setFieldValue("country", selectedOption)
              }
              onBlur={formik.handleBlur}
              options={Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
              }))}
            />
          </div>
          <div className="col-lg-1 ">
            <label className="htmlFor  ">Pincode</label>
          </div>
          <div className="col-lg-3 ">
            <input
              id="pincode"
              type="number"
              className="form-control"
              name="pincode"
              style={{ width: "300px", height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
            />
          </div>
          <div className="col-lg-4 "></div>
        </div>
        <div className="d-flex mt-4">
          <h2>Other Details</h2>
        </div>
        <div className="row">
          <div className="col-lg-1 ">
            <label className="htmlFor">Occupation </label>
          </div>
          <div className="col-lg-2 ">
            <input
              id="occupation"
              type="text"
              name="occupation"
              className="form-control"
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.occupation}
            />
          </div>
          <div className="col-lg-1 ">
            <label className=" ">Religion</label>
          </div>
          <div className="col-lg-2 ">
            <select
              id="religion"
              name="religion"
              className="form-select  "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.religion}
            >
              <option value={null}>Religion...</option>
              <option value={RELIGION.CHRISTIANITY}>Christianity</option>
              <option value={RELIGION.ISLAM}>Islam</option>
              <option value={RELIGION.HINDUISM}>Hindunism</option>
              <option value={RELIGION.BUDDHISM}>Buddhism</option>
              <option value={RELIGION.SIKHISM}>Sikhism</option>
              <option value={RELIGION.JUDAISM}>Judaism</option>
              <option value={RELIGION.OTHER}>Other</option>
            </select>
          </div>
          <div className="col-lg-2 ">
            <label className=" ">Marital Status</label>
          </div>
          <div className="col-lg-2 ">
            <select
              id="maritalStatus"
              name="maritalStatus"
              className="form-select "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.maritalStatus}
            >
              <option value={MARITAL_STATUS.SINGLE}>Single</option>
              <option value={MARITAL_STATUS.MARRIED}>Married</option>
              <option value={MARITAL_STATUS.DIVORCED}>Divorced</option>
              <option value={MARITAL_STATUS.WIDOWED}>Widowed</option>
              <option value={MARITAL_STATUS.SEPARATED}>Separated</option>
            </select>
          </div>
          <div className="col-lg-1 ">
            <label className="htmlFor  ">Blood Group</label>
          </div>
          <div className="col-lg-1 ">
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="form-select  "
              style={{ height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bloodGroup}
            >
              <option value={null}>Blood...</option>
              <option value={BLOOD_GROUP.AB_POSITIVE}>A+</option>
              <option value={BLOOD_GROUP.AB_NEGATIVE}>A-</option>
              <option value={BLOOD_GROUP.B_POSITIVE}>B+</option>
              <option value={BLOOD_GROUP.B_NEGATIVE}>B-</option>
              <option value={BLOOD_GROUP.AB_POSITIVE}>AB+</option>
              <option value={BLOOD_GROUP.AB_NEGATIVE}>AB-</option>
              <option value={BLOOD_GROUP.O_POSITIVE}>O+</option>
              <option value={BLOOD_GROUP.O_NEGATIVE}>O-</option>
            </select>
          </div>
        </div>
        <div className="row mt-5">
          <div className=" col-lg-1 ">
            <label className="htmlFor  ">Nationality</label>
          </div>
          <div className="col-lg-3 ">
            <input
              id="nationality"
              type="text"
              className="form-control"
              name="nationality"
              style={{ width: "300px", height: "50px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationality}
            />
          </div>
          <div className="col-lg- "></div>
        </div>
        <div className="d-flex justify-content-end ">
          <button type="button" className="btn btn-outline-danger px-5 py-3">
            Cancle
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <button type="submit" className="btn btn-success px-5 py-3">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddUserData;

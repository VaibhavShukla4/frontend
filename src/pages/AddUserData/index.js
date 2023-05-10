import React, { useState, useEffect } from "react";
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
const AddUserData = () => {
  const [sexType, setSexType] = useState(null);
  const [govtIssueId, setGovtIssueId] = useState(null);
  const [guardianGender, setGuardianGender] = useState(null);
  const [religion, setReligion] = useState(null);
  const [marital, setMarital] = useState(null);
  const [blood, setBlood] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    age: "",
    sex: null,
    mobile: "",
    govtId: "",
  });

  const [contactDetails, setContactDetails] = useState({
    guardiansName: "",
    email: "",
    emergencyContact: "",
  });
  const [addressDetails, setAddressDetails] = useState({
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
  });
  const [otherDetails, setOtherDetails] = useState({
    occupation: "",
    religion: "",
    maritalStatus: "",
    bloodGroup: "",
    nationality: "",
  });
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressDetailsChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOtherDetailsChange = (e) => {
    const { name, value } = e.target;
    setOtherDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {}, [selectedCountry]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5000/adduser-detail", {
      method: "post",
      body: JSON.stringify({
        name: personalDetails.name,
        age: personalDetails.age,
        sex: sexType,
        mobile: personalDetails.mobile,
        emergencyContact: contactDetails.emergencyContact,
        idType: govtIssueId,
        govtId: personalDetails.govtId,
        guardianName: contactDetails.guardiansName,
        guardianSex: guardianGender,
        email: contactDetails.email,
        address: addressDetails.address,
        state: selectedState.name,
        city: selectedCity.name,
        country: selectedCountry.name,
        pincode: addressDetails.pincode,
        occupation: otherDetails.occupation,
        religion: religion,
        maritalStatus: marital,
        bloodGroup: blood,
        nationality: otherDetails.nationality,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <section className="m-5">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <h2>Personal Details</h2>
        </div>
        <div className="d-flex ">
          <div className="form-group d-flex align-items-center w-50">
            <label className="htmlFor mx-5 ">Name</label>
            <input
              type="text"
              style={{ width: "700px", height: "50px" }}
              name="name"
              className="form-control "
              value={personalDetails.name}
              onChange={handlePersonalDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center h-50 w-50">
            <label className="htmlFor mx-5">Date of Birth or Age</label>
            <input
              type="number"
              name="age"
              style={{ width: "450px", height: "50px" }}
              className="form-control"
              value={personalDetails.age}
              onChange={handlePersonalDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className="htmlFor mx-5">Sex</label>
            <select
              className="form-select w-50 "
              style={{ height: "50px" }}
              id="inputGroupSelect01"
              onChange={(e) => setSexType(e.target.value)}
            >
              <option value={null}>Sex...</option>
              <option value={SEX.MALE}>Male</option>
              <option value={SEX.FEMALE}>Female</option>
              <option value={SEX.OTHER}>Other</option>
            </select>
          </div>
        </div>
        <div className="d-flex mt-5 ">
          <div className="form-group d-flex  w-50 h-50 align-items-center">
            <label className="htmlFor mx-5 ">Mobile</label>
            <input
              type="number"
              name="mobile"
              style={{ width: "550px", height: "50px" }}
              className="form-control  "
              value={personalDetails.mobile}
              onChange={handlePersonalDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center   h-100">
            <label className="htmlFor mx-5 ">Govt Issued ID</label>
            <select
              className="form-select "
              style={{ height: "50px", width: "200px" }}
              id="inputGroupSelect01"
              onChange={(e) => setGovtIssueId(e.target.value)}
            >
              <option value={null}>GovtId...</option>
              <option value={GOVT_ISSUED_ID.AADHAR}>Aadhar</option>
              <option value={GOVT_ISSUED_ID.PAN}>Pan</option>
            </select>
            <input
              type="text"
              name="govtId"
              style={{ width: "440px", height: "50px" }}
              className="form-control  "
              value={personalDetails.govtId}
              onChange={handlePersonalDetailsChange}
              required
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <h2>Contact Details</h2>
        </div>
        <div className="d-flex r">
          <div className="form-group d-flex align-items-center  h-100">
            <label className="htmlFor mx-4 ">Guardians Details</label>
            <select
              className="form-select "
              style={{ height: "50px", width: "200px" }}
              id="inputGroupSelect01"
              onChange={(e) => setGuardianGender(e.target.value)}
            >
              <option value={null}>Guardian Gender...</option>
              <option value={GUARDIAN_GENDER.MALE}>Male</option>
              <option value={GUARDIAN_GENDER.FEMALE}>Female</option>
              <option value={GUARDIAN_GENDER.OTHER}>Other</option>
            </select>
            <input
              type="text"
              name="guardiansName"
              style={{ width: "350px", height: "50px" }}
              className="form-control  "
              value={contactDetails.guardiansName}
              onChange={handleContactDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className=" mx-5">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              style={{ width: "340px", height: "50px" }}
              value={contactDetails.email}
              onChange={handleContactDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className=" ">Emergency Contact Number</label>
            <input
              type="tel"
              name="emergencyContact"
              style={{ width: "300px", height: "50px" }}
              className="form-control"
              value={contactDetails.emergencyContact}
              onChange={handleContactDetailsChange}
              required
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <h2>Address Details</h2>
        </div>
        <div className="d-flex">
          <div className="form-group d-flex align-items-center  h-100">
            <label className="htmlFor mx-5 ">Address</label>
            <input
              type="text"
              name="address"
              style={{ width: "650px", height: "50px" }}
              className="form-control  "
              value={addressDetails.address}
              onChange={handleAddressDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className=" mx-5">State</label>

            <Select
              options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={selectedState}
              onChange={(item) => {
                setSelectedState(item);
              }}
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className=" mx-5">City</label>

            <Select
              options={City.getCitiesOfState(
                selectedState?.countryCode,
                selectedState?.isoCode
              )}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={selectedCity}
              onChange={(item) => {
                setSelectedCity(item);
              }}
            />
          </div>
        </div>
        <div className="d-flex mt-5">
          <div className="form-group d-flex align-items-center  w-50 h-50">
            <label className="htmlFor mx-5 ">Country</label>
            <Select
              options={Country.getAllCountries()}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={selectedCountry}
              onChange={(item) => {
                setSelectedCountry(item);
              }}
            />
          </div>
          <div className="form-group d-flex align-items-center  h-100">
            <label className="htmlFor mx-5 ">Pincode</label>
            <input
              type="number"
              name="pincode"
              style={{ width: "300px", height: "50px" }}
              className="form-control  "
              value={addressDetails.pincode}
              onChange={handleAddressDetailsChange}
              required
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <h2>Other Details</h2>
        </div>
        <div className="d-flex">
          <div className="form-group d-flex align-items-center  h-100">
            <label className="htmlFor mx-5 ">Occupation </label>
            <input
              type="text"
              name="occupation"
              style={{ width: "300px", height: "50px" }}
              className="form-control  "
              value={otherDetails.occupation}
              onChange={handleOtherDetailsChange}
              required
            />
          </div>
          <div className="form-group d-flex align-items-center w-50">
            <label className=" mx-5">Religion</label>
            <select
              className="form-select "
              style={{ width: "300px", height: "50px" }}
              id="inputGroupSelect01"
              onChange={(e) => setReligion(e.target.value)}
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
          <div className="form-group d-flex align-items-center w-50">
            <label className=" mx-5">Marital Status</label>
            <select
              className="form-select "
              style={{ width: "300px", height: "50px" }}
              id="inputGroupSelect01"
              onChange={(e) => setMarital(e.target.value)}
            >
              <option value={null} ted>
                Marital Status...
              </option>
              <option value={MARITAL_STATUS.SINGLE}>Single</option>
              <option value={MARITAL_STATUS.MARRIED}>Married</option>
              <option value={MARITAL_STATUS.DIVORCED}>Divorced</option>
              <option value={MARITAL_STATUS.WIDOWED}>Widowed</option>
              <option value={MARITAL_STATUS.SEPARATED}>Separated</option>
            </select>
          </div>
          <div className="form-group d-flex align-items-center w-50 h-50">
            <label className="htmlFor mx-5 ">Blood Group</label>
            <select
              className="form-select "
              style={{ width: "180px", height: "50px" }}
              id="inputGroupSelect01"
              onChange={(e) => setBlood(e.target.value)}
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
        <div className="d-flex mt-5">
          <div className="form-group d-flex align-items-center  h-100">
            <label className="htmlFor mx-5 ">Nationality</label>
            <input
              type="text"
              name="nationality"
              style={{ width: "300px", height: "50px" }}
              className="form-control  "
              value={otherDetails.nationality}
              onChange={handleOtherDetailsChange}
              required
            />
          </div>
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

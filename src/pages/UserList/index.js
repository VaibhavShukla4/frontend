import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Link } from "react-router-dom";
const UserList = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/list");
      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <Link to={"/adduser"}>Add User</Link>
      <div className="mt-4">
        <div className="d-flex justify-content-end "></div>
        <MaterialTable
          data={data}
          columns={[
            { title: "Name", field: "name" },

            { title: "Age", field: "age" },
            { title: "Sex", field: "sex" },
            {
              title: "Mobile",
              field: "mobile",
            },

            {
              title: "Govt Issued ID",
              field: "govtId",
            },
            {
              title: "Guardian Details",
              field: "guardianName",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Emergency Contact Number",
              field: "emergencyContact",
            },
            {
              title: "Address",
              field: "address",
            },
            {
              title: "State",
              field: "state",
            },
            {
              title: "City",
              field: "city",
            },
            {
              title: "Country",
              field: "country",
            },
            {
              title: "Pincode",
              field: "pincode",
            },
            {
              title: "Occupation",
              field: "occupation",
            },
            {
              title: "Religion",
              field: "religion",
            },
            {
              title: "Marital Status",
              field: "maritalStatus",
            },
            {
              title: "Blood Group",
              field: "bloodGroup",
            },
            {
              title: "Nationality",
              field: "nationality",
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#bce4b7",
              color: "black",
            },
            rowStyle: {
              backgroundColor: "#f0f5f8",
              color: "black",
            },
          }}
          title="DASHBOARD"
        />
      </div>
    </div>
  );
};

export default UserList;

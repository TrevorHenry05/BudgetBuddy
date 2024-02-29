import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";

function Group() {
  const [group, setGroup] = useState(null);
  const [membersData, setMembersData] = useState({});
  const token = localStorage.getItem("token");
  const { groupId } = useParams();
  useEffect(() => {
    const fetchGroup = async () => {
      console.log('id= ', groupId)
      try {
        const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('res data: ', response.data);
        setGroup(response.data);

        // Fetch data for all members in the group
        const membersData = await Promise.all(
          group.members.map(async (memberId) => {
            const memberResponse = await axios.get(
              `${API_URL}/api/members/${memberId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return memberResponse.data;
          })
        );
        console.log('m data: ', membersData)

        // Organize member data by ID
        const membersDataById = {};
        membersData.forEach((member) => {
          membersDataById[member._id] = member;
        });
        setMembersData(membersDataById);
        // // Fetch data for all members in the group
        // const membersData = await Promise.all(
        //   response.data.members.map(async (memberId) => {
        //     const memberResponse = await axios.get(
        //       `${API_URL}/api/groups/${groupId}/${memberId}`,
        //       {
        //         headers: {
        //           Authorization: `Bearer ${token}`,
        //         },
        //       }
        //     );
        //     console.log('m data: ', memberId)
        //     return memberResponse.data;
        //   })

        // );
        // console.log('m data: ', membersData)

        // // Organize member data by ID
        // const membersDataById = membersData.reduce((acc, member) => {
        //   acc[member._id] = member;
        //   return acc;
        // }, {});
        // setMembersData(membersDataById);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      }
    };

    if (groupId) {
      fetchGroup();
    }
  }, [groupId, token]); // Add groupId and token as dependencies

  if (!group) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>Group page</p>
      <div>
        <h3>{group.groupName}</h3>
        <p>Members:</p>
        <ul>
        {group.members.map((member, index) => (
          <li key={index}>
            {/* Display member username */}
            <p>Username: {member.username}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default Group;

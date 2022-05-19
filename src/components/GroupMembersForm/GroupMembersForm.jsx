import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateGroup } from '../../api/groups';
import { getUserInfo } from '../../api/userInfo';
import toast, { Toaster } from 'react-hot-toast';
import './GroupMembersForm.css';

const GroupMembersForm = ({ setPageStatus, pageStatus }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [friends, setFriends] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [members, setMembers] = useState([]);

  const { groupId } = useParams();

  const [addedMembers, setAddedMembers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Get user info
  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserInfo(userInfo);
        setFriends(userInfo?.friends);
      }
    };
    getUserData();
  }, []);

  // Initialize selected friends
  useEffect(() => {
    if (friends.length) {
      setIsSelected(new Array(friends.length).fill(false));
    }
  }, [friends.length]);

  useEffect(() => {
    const selectedFriends = [];
    for (let [index, selectedMember] of isSelected.entries()) {
      if (selectedMember) {
        selectedFriends.push(friends[index]);
      }
    }
    setSelectedFriends(selectedFriends);
  }, [isSelected, friends]);

  useEffect(() => {
    const members = [...selectedFriends, ...addedMembers];
    setMembers(members);
  }, [selectedFriends, addedMembers]);

  const handleIsSelected = (index, e) => {
    setIsSelected((prev) => {
      const tmp = [...prev];
      tmp[index] = !isSelected[index];
      return tmp;
    });
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddMember = (e) => {
    const isPresent = addedMembers.filter((addedMember) => {
      return addedMember.email === email;
    });

    if (isPresent.length === 0) {
      setAddedMembers((prev) => {
        return [
          ...prev,
          {
            _id: undefined,
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        ];
      });
    }
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  const handleDeleteMember = (email, e) => {
    e.preventDefault();

    const index = friends.findIndex((member) => {
      return member.email === email;
    });

    if (index === -1) {
      setAddedMembers((prev) => {
        const tmp = [...prev];
        return tmp.filter((member) => member.email !== email);
      });
    } else {
      setIsSelected((prev) => {
        const tmp = [...prev];
        tmp[index] = false;
        return tmp;
      });
    }
  };

  const handleCancelBtn = () => {
    setPageStatus('expenses');
  };

  const handleSubmitMembers = async (e) => {
    e.preventDefault();
    const { success, errorMessage } = await updateGroup(groupId, {
      members: members,
    });

    if (!success) {
      toast.error(errorMessage);
    } else {
      setPageStatus('expenses');
    }
  };

  return (
    <>
      {userInfo && (
        <div className="group-members-form">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="selected-members">
            {members &&
              members?.map((member, index) => (
                <div key={index}>
                  <span>{member.firstName}</span>
                  <button
                    onClick={(e) => handleDeleteMember(member.email, e)}
                    className="icon-btn"
                    type="button"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
          </div>

          <button onClick={handleCancelBtn} type="button" className="icon-btn">
            <i className="fa-solid fa-xmark fa-2x"></i>
          </button>

          <div>
            <form>
              <input
                type="text"
                placeholder="First Name"
                onChange={handleFirstName}
                value={firstName}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={handleLastName}
                value={lastName}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmail}
                value={email}
                required
              />
              <button type="button" onClick={handleAddMember}>
                Add
              </button>
            </form>
          </div>

          <div>
            <form onSubmit={handleSubmitMembers}>
              {friends &&
                friends.map((friend, index) => (
                  <div className="friends-item" key={friend._id}>
                    <input
                      type={'checkbox'}
                      checked={isSelected[index] || false}
                      onChange={(e) => handleIsSelected(index, e)}
                    />
                    <p>{friend.firstName}</p>
                  </div>
                ))}
              <button className="btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupMembersForm;

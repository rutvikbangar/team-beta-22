import React, { useState, useEffect } from "react";
import './Profile.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('account-general');
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    coins: 0,
    avatar: ""
  });

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:4000/api/v1/users',{
        method:"GET",
       headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
    }
      },[])

      const data = await response.json()
     console.log(data)
     const {username,fullname,avatar,coins,email} = data.data

     setUserData({username,fullname,email,coins,avatar})
      

      
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      
      
      <div className="card">
        <div className="row no-gutters">
        

          <div className="col-md-9 col-12">
            <div className="tab-content">
              {activeTab === 'account-general' && (
                <div className="tab-pane fade active show" id="account-general">
                  <div className="card-body media align-items-center">
                    <img src= {userData.avatar} alt="User Avatar" className="d-block ui-w-80" />
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '1.2em' }}>Full Name</label>
                      <input type="text" className="form-control mb-1" value={userData.fullname} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '1.2em' }}>Username</label>
                      <input type="text" className="form-control mb-1" value={userData.username} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '1.2em' }}>E-mail</label>
                      <input type="text" className="form-control mb-1" value={userData.email} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '1.2em' }}>Coins</label>
                      <input type="text" className="form-control mb-1" value={userData.coins} readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account-change-password' && (
                <div className="tab-pane fade" id="account-change-password">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <button type="button" className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

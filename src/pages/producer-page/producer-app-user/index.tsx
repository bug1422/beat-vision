import { HttpClient } from "@/common";
import { Tag } from "@/pages/pages/Search";
import { CustomIdentityUserDto } from "@/types/ApplicationTypes/IdentityType";
import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Row, TabContainer, Table, Nav, NavLink, NavItem, TabPane } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import UserInfo from "./component/userInfo";
type RoleResponse = {
  Id: number,
  Name: string,
  Description: string,
  RoleClaims: []
}

export default function ProducerAppUser() {

  const [tab, setTab] = useState(1)
  const [error1, setError1] = useState("")
  const [error2, setError2] = useState("")
  const [filtered, setFiltered] = useState<CustomIdentityUserDto[]>()
  const [selected, setSelected] = useState<UserProfileDto>()

  const FetchUserProfile = async (userId: number) => {
    try {
      const res: AxiosResponse<UserProfileDto> =
        await HttpClient.get('/api/ManageUser/' + userId)
      if (res?.data) {
        console.log(res?.data)
        return res?.data
      }
    }
    catch (err: any) {
      setError2(err)
    }
    return undefined
  }

  const FetchRole = async () => {
    try {
      const res: AxiosResponse<RoleResponse[]> =
        await HttpClient.get('/api/ManageRoleClaim/get-all')
      if (res?.data) {
        return res?.data.find(p => p.Name.toLowerCase().includes('user'))?.Id
      }
    }
    catch (err: any) {
      setError1(err)
    }
    return undefined
  }

  const FetchUsers = async () => {
    try {
      const roleId = await FetchRole();
      if (!roleId) {
        return false
      }
      const res: AxiosResponse<CustomIdentityUserDto[]> =
        await HttpClient.get('/api/ManageIdentity/get-user-in-role', {
          params: {
            roleId: roleId,
          }
        })
      if (res?.data) {
        setFiltered(res?.data)
      }
    }
    catch (err: any) {
      setError1(err)
      return false
    }
  }


  const GetUser = async (userId: number) => {
    setError2("")
    const user = await FetchUserProfile(userId)
    if (user != undefined) {
      setSelected(user)
    }
  }


  const switchTab = (key: any) => {
    setTab(key)
  }

  useEffect(() => {
    setError1("")
    FetchUsers()
  }, [])

  return (
    <>
      <div>
        <div className="fs-1 border-bottom mb-3">User Management</div>
        <TabContainer activeKey={tab} >
          <div className="pb-4">
            <Nav
              className="nav-border nav-pills mb-0"
              id="pills-tab"
              role="tablist"
            >
              <NavItem>
                <NavLink eventKey="1"  onClick={() => { switchTab(1)}} >All Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey="2" onClick={() => { if(selected) switchTab(2)}}>User Profile</NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabPane eventKey="1" className="fade">
            <Row className="d-flex justify-content-center">
              {error1 != undefined && error1 != "" ? <div className="text-center fs-1 fw-bold">{error1}</div> :
                <Col xs={8}>
                  {
                    filtered && filtered.length > 0 ? <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>UserName</th>
                          <th>Email</th>
                          <th>Roles</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((user, idx) =>
                          <tr key={idx}>
                            <td>{user.Id}</td>
                            <td>{user.UserName}</td>
                            <td>{user.Email} {user.EmailConfirmed ? <FiCheckCircle /> : <></>}</td>
                            <td>{user.Roles.map((role, idx) =>
                              (role.Name ? <Tag name={role.Name} key={idx} /> : <></>)
                            )}</td>
                            <td><NavItem className="btn btn-outline-primary" ><NavLink eventKey="2" onClick={() => { GetUser(user.Id); switchTab(2) }}>See Profile</NavLink></NavItem></td>
                          </tr>)
                        }
                      </tbody>
                    </Table> : <div className="text-center fs-1 fw-bold">No user found</div>}
                </Col>}
            </Row>
          </TabPane>
          <TabPane eventKey="2" className="fade">
            {error2 != undefined && error2 != "" ? <div className="text-center fs-1 fw-bold">{error2}</div> :
              <Col xs={12}>
                {
                  selected ? <>
                    <UserInfo user={selected}/>
                  </>
                    : <div className="text-center fs-1 fw-bold">No user found</div>}
              </Col>}
          </TabPane>
        </TabContainer>
      </div >
    </>
  );
}

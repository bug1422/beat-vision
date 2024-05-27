import { CustomIdentityUserDto } from "@/types/ApplicationTypes/IdentityType";
import { Row } from "react-bootstrap";

const MockUserListDto: CustomIdentityUserDto[] = [
  {
    Id: 9,
    Dob: "2024-05-12T00:00:00",
    UserName: "minhtran01@gmail.com",
    Email: "minhtran01@gmail.com",
    EmailConfirmed: false,
    LockoutEnd: "0001-01-01T00:00:00",
    AccessFailedCount: 0,
    UserProfile: null,
    UserTokens: [
      {
        UserId: 9,
        ExpiredDate: "2024-05-12T21:36:19.8236731",
        LoginProvider: "BeatVision",
        Name: "RefreshToken",
        Value: "OLLTuxy4IUmwr4LipsF8tw==",
      },
    ],
    UserClaims: [],
    Roles: [
      {
        Id: 1,
        Name: "User",
        Description: "User with basic function",
        RoleClaims: [],
      },
    ],
    UserLogins: [],
  },
  {
    Id: 13,
    Dob: "0001-01-01T00:00:00",
    UserName: "minhtran03@gmail.com",
    Email: "minhtran03@gmail.com",
    EmailConfirmed: false,
    LockoutEnd: "0001-01-01T00:00:00",
    AccessFailedCount: 0,
    UserProfile: {
      Id: 1,
      Description: null,
      Fullname: "minh tran",
      ProfileBlobUrl: null,
      Birthday: null,
      AccountStatus: 0,
      Caption: null,
      TotalTrack: 0,
      Instagram: null,
      Youtube: null,
      SoundCloud: null,
      Facebook: null,
      CartItems: [],
      Notifications: [],
      CreatedMessage: [],
    },
    UserTokens: [
      {
        UserId: 13,
        ExpiredDate: "2024-05-16T00:45:38.7264619",
        LoginProvider: "BeatVision",
        Name: "RefreshToken",
        Value: "NzudHLp/C0+iXCQ9u0Ykbg==",
      },
    ],
    UserClaims: [],
    Roles: [
      {
        Id: 1,
        Name: "User",
        Description: "User with basic function",
        RoleClaims: [],
      },
    ],
    UserLogins: [],
  },
];
export default function ProducerAppUser() {
  return (
    <>
      <div>
        <Row>asdfasfd</Row>
      </div>
    </>
  );
}

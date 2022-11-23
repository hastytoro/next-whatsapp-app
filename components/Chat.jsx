import styled from "styled-components";
import { Avatar } from "@mui/material";

import { getRecipientEmail } from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { where, collection, query } from "firebase/firestore";

function Chat({ id, users }) {
  const [userLoggedIn] = useAuthState(auth);

  // Separate user from logged in user from `chatRef` document
  const recipientEmail = getRecipientEmail(users, userLoggedIn);

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", recipientEmail));
  const [recipientSnapshot] = useCollection(q);
  // Here we after the recipient with a photoURL:
  // console.log(recipientSnapshot?.docs?.[0]?.data());
  const recipientPhoto = recipientSnapshot?.docs?.[0]?.data()?.photoUrl;

  return (
    <Container>
      {recipientPhoto ? (
        <UserAvatar src={recipientPhoto} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  cursor: pointer;
  :hover {
    background: rgb(233, 234, 235);
  }

  p {
    font-size: 12px;
    font-weight: 300;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
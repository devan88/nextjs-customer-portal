import { GetUser } from '@/utils/api';
import React from 'react';

const getEmail = (id: string, setEmail: React.Dispatch<React.SetStateAction<string>>) => {
  GetUser(id).then((email) => setEmail(email));
};

export default function Email({ id, maskedEmail }: { id: string; maskedEmail: string }) {
  const [email, setEmail] = React.useState(maskedEmail);
  const [isMasked, setIsMasked] = React.useState(true);
  const handleClick = () => {
    setIsMasked(!isMasked);
    if (isMasked) {
      getEmail(id, setEmail);
    }
  };
  return (
    <div onClick={handleClick}>
      {isMasked && <span className="cursor-pointer">{maskedEmail}</span>}
      {!isMasked && <span className="cursor-pointer">{email}</span>}
    </div>
  );
}

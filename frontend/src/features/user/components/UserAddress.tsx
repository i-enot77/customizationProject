import { UserAddressData } from "@/services/userSlice";

function UserAddress({ address, zipCode, city, country }: UserAddressData) {
  return (
    <div>
      <div>{address}</div>
      <div>{`${zipCode} ${city}`}</div>
      <div>{country}</div>
    </div>
  );
}

export default UserAddress;

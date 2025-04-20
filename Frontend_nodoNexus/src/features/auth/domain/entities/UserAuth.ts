import { User } from "../../../../shared/types/User";

export default interface UserAuth extends User {
  token?: string;
}

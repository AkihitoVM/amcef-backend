import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../models";
import { ErrorResponse } from "../../utils/error.response";
import { CreateUserInput, LoginUserInput, LoginResponse } from "../dto";

export const registerUser = async (
  input: CreateUserInput
): Promise<Boolean | ErrorResponse> => {
  const { email, password } = input;
  console.log(input);
  
  const hashedPassword = hashSync(password, process.env.SALT);

  try {
    const [_user, created] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: { email, password: hashedPassword },
    });
    
    return created;
  } catch (err: any) {
    
    return {
      message: "Internal Error",
      statusCode: 500
    }
  }
};

export const loginUser = async (
  input: LoginUserInput
): Promise<LoginResponse | ErrorResponse> => {
  const { email, password } = input;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const response: ErrorResponse = {
      message: "could not find user",
      statusCode: 404
    };
    return response;
  }

  const valid = compareSync(password, user.password);

  if (!valid) {
    const response: ErrorResponse = {
      message: "bad password",
      statusCode: 400
    };
    return response;
  }

  return {
    user,
    accessToken: sign({ userId: user.id }, process.env.JWTACCESS, {
      expiresIn: "60m",
    }),
  };
};

// TODO? refresh token

const minUsernameLength = 4;
const minPasswordLength = 6;
// TODO: max length

interface IUserSchemaProperty {
  type: Object;
  required?: [boolean, string];
  match?: [RegExp, string];
  unique?: boolean;
  minLength?: [number, string];
  maxLength?: [number, string];
  default?: any;
}

interface IUserSchema {
  email: IUserSchemaProperty;
  username: IUserSchemaProperty;
  password: IUserSchemaProperty;
}

const userSchema: IUserSchema = {
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    match: [/^[^@\s]+@[^@\s]+$/, "Please enter a valid email address"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    match: [
      /^[_a-zA-Z0-9]+$/,
      "Invalid username. Valid characters: alphanumeric(0-9), alphabetic(a-z and A-Z) and underscore(_)",
    ],
    minLength: [
      minUsernameLength,
      `Username must be at least ${minUsernameLength} characters long`,
    ],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minLength: [
      minPasswordLength,
      `Password must be at least ${minPasswordLength} characters long`,
    ],
  },
};

export default userSchema;

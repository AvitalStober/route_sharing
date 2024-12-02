export default interface SignUpFormProps {
    onSubmit: (fullName: string, email: string, password: string, age: string, address: string) => void;
  }
  
export const validatePersonForm = (data) => {
    const errors = {};
    if (!data.first_name) errors.first_name = 'First name is required';
    if (!data.last_name) errors.last_name = 'Last name is required';
    if (!data.email) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Invalid email format';
    if (!data.phone_number) errors.phone_number = 'Phone number is required';
    if (!data.address) errors.address = 'Address is required';
    return errors;
  };
  
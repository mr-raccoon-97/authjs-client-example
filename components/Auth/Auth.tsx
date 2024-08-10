import './Auth.css'
import React, { FunctionComponent } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'
import { UseFormWatch } from 'react-hook-form'

interface Field {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    watch?: UseFormWatch<FieldValues>
}

const FirstNameField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='first-name'>First Name</label>
        <input type='text' {
            ...register('first-name', {
            required: { value: true, message: "First name is required" }
        })} />
        { errors['first-name'] ? <span> <> { errors['first-name'].message } </> </span> : <span>&nbsp;</span> }
    </>
)


const LastNameField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='last-name'>Last Name</label>
        <input type='text' {
            ...register('last-name', {
            required: { value: true, message: "Last name is required" }
        })} />
        { errors['last-name'] ? <span><> { errors['last-name'].message } </></span> : <span>&nbsp;</span> }
    </>
)


const EmailField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='email'>Email</label>
        <input type='email' {...register('email', { 
            required: { value: true, message: "Email is required" }, 
            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" }
        })} />
        { errors['email'] ? <span> <> { errors['email'].message } </> </span> : <span>&nbsp;</span>}
    </>
)


const PasswordField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='password'>Password</label>
        <input type='password' {...register('password',{
            required: { value: true, message: "Password is required" },
            minLength: { value: 8, message: "Password must be at least 8 characters long" }
        })} />
        { errors['password'] ? <span><>{ errors['password'].message } </> </span> : <span>&nbsp;</span> }
    </>
)

const ConfirmPasswordField : FunctionComponent<Field> = ({ register, errors, watch }) => (
    <>
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input type='password' {...register('confirm-password',{
            required: { value: true, message: "Password confirmation is required" },
            validate: (value) => value === (watch && watch('password')) || "Passwords do not match"
            
        })} />
        { errors['confirm-password'] ? <span><>{ errors['confirm-password'].message } </></span> : <span>&nbsp;</span>}
    </>
)

const BirthdateField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='birthdate'>Birthdate</label>
        <input type='date' {...register('birthdate',{
            required: { value: true, message: "Birthdate is required" },       
            validate: (value) => {
                let date = new Date(value)
                let now = new Date()
                let age = now.getFullYear() - date.getFullYear()
                return age >= 18 ? true : "You must be at least 18 years old"
            }
        })} />
        { errors['birthdate'] ? <span> <> { errors['birthdate'].message } </> </span> : <span>&nbsp;</span> }
    </>
)

const TermsAndConditionsField : FunctionComponent<Field> = ({ register, errors }) => (
    <>
        <label htmlFor='terms-and-conditions'>Terms and Conditions</label>
        <input type='checkbox' {...register('terms-and-conditions',{ 
            required: { value: true, message: "You must accept terms and conditions" }
        })} />
        { errors['terms-and-conditions'] ? <span> <> { errors['terms-and-conditions'].message } </></span> : <span>&nbsp;</span>}
    </>
)

interface Form {
    onSubmit: () => void
    children: React.ReactNode
}

const RegistrationForm : FunctionComponent<Form> = ({onSubmit, children}) => (
    <form onSubmit={onSubmit}>
        {children}
        <input type='submit' value='Register' />
    </form>
)

export { 
    FirstNameField, 
    LastNameField, 
    EmailField, 
    PasswordField, 
    ConfirmPasswordField, 
    BirthdateField, 
    TermsAndConditionsField,
    RegistrationForm
}
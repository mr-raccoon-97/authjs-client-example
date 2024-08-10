'use client'

import { useForm } from 'react-hook-form'
import { 
    FirstNameField, 
    LastNameField, 
    EmailField, 
    PasswordField, 
    ConfirmPasswordField, 
    BirthdateField, 
    TermsAndConditionsField,
    RegistrationForm
} from './Auth'

import { registerUser } from '@/services/registration'

const RegisterUser = () => {
    const { register, watch, handleSubmit, formState : { errors } } = useForm()
    const onSubmit = handleSubmit(async (data) => { 
        await registerUser({
            name: `${data['first-name']} ${data['last-name']}`,
            email: data['email'],
            password: data['password']
        })
    })

    return <RegistrationForm onSubmit={ onSubmit } >
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col space-y-4 w-full'>
                <FirstNameField register={register} errors={errors} />
                <LastNameField register={register} errors={errors} />
                <EmailField register={register} errors={errors} />
            </div>
            <div className='flex flex-col space-y-4 w-full'>
                <PasswordField register={register} errors={errors} />
                <ConfirmPasswordField register={register} errors={errors} watch={watch} />
                <BirthdateField register={register} errors={errors} />
            </div>
        </div>
        <TermsAndConditionsField register={register} errors={errors} />
    </RegistrationForm>
}

export { RegisterUser }
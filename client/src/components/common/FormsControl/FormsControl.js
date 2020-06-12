import React from "react";
import {Field} from "redux-form";
import s from './FormsControl.module.css'
import cn from 'classnames'

const FormControl = ({meta: { touched, error }, children})  => {
    const hasError = error && touched;
    return (
        <div className={cn(s.formControl, hasError && s.error)}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Input = (props) => {
    const {input, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
};

export const createField = (placeholder, name, validators, component, type, text = '') => (
    <div>
        <Field type={type}
               placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}/> {text}
    </div>
);
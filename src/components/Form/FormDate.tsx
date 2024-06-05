import {
	Controller,
	type FieldPath,
	type FieldValues,
	type PathValue,
} from 'react-hook-form'
import type { FormInputProps } from '../types'
import { Form, FormControlProps } from 'react-bootstrap'

const FormDate = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues> 
>({
	control,
	id,
	label,
	name,
	containerClass,
	placeholder,
	labelClassName,
	className,
	type,
	value,
	noValidate,
	...other
}: FormInputProps<TFieldValues> & FormControlProps) => {
	return (
		<Controller<TFieldValues, TName>
			name={name as TName}
			control={control}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{label && <Form.Label className={labelClassName}>{label}</Form.Label>}
					<Form.Control
						defaultValue={value}
						className={className}
						id={id ?? name}
						type="date"
						placeholder={placeholder}
						isInvalid={!noValidate && fieldState.error != null}
						{...other}
						{...field}
					/>
					{!noValidate && fieldState.error?.message && (
						<Form.Control.Feedback type="invalid" className="text-danger">
							{fieldState.error?.type == "typeError" ? "Can't leave a blank date" : fieldState.error?.message}
						</Form.Control.Feedback>
					)}
				</Form.Group>
			)}
		/>
	)
}

export default FormDate

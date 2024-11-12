import React from 'react';
import {styled, Theme} from '@mui/material/styles';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import Button, {ButtonProps} from '@mui/material/Button';
import Box, {BoxProps} from '@mui/material/Box';
import {SxProps, TextField, TextFieldProps} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';

export const AccordionComponent = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiPaper-root': {
        margin: 0,
    },
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

export const AccordionSummaryComponent = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

export const AccordionDetailsComponent = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
}));

export const TypographyComponent = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'completed' && prop !== 'sx'
})<{
    completed?: boolean;
    sx?: SxProps<Theme>;
}>(({ completed }) => ({
    marginLeft: '10px',
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? 'rgba(0, 0, 0, 0.54)' : 'inherit',
}));

export const CheckboxComponent = styled((props: CheckboxProps & { 'data-testid'?: string }) => {
    const { 'data-testid': dataTestId, ...otherProps } = props;

    return <Checkbox
        size='large'
        icon={<CircleUnchecked sx={{ color: '#00ff00' }} />}
        checkedIcon={<CircleChecked sx={{ color: '#00ff00' }} />}
        inputProps={{
            'data-testid': dataTestId
        } as React.InputHTMLAttributes<HTMLInputElement>}
        {...otherProps}
    />
})(() => ({}));

export const ButtonComponent = styled(
    ({ isActive, ...props }: ButtonProps & { isActive?: boolean }) => (
        <Button {...props} />
    )
)<{ isActive?: boolean }>(({ theme, isActive }) => ({
    textTransform: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
    border: isActive ? '2px solid rgba(255, 127, 80, 0.3)' : '2px solid transparent',
    borderRadius: theme.shape.borderRadius,
}));

export const BoxComponent = styled((props: BoxProps) => (
    <Box {...props} />
))(() => ({}));

export const TextFieldComponent = styled((props: TextFieldProps & { 'data-testid'?: string }) => {
    const { 'data-testid': dataTestId, ...otherProps } = props;

    return <TextField
        placeholder="What needs to be done?"
        variant="standard"
        size="small"
        sx={{
            '& .MuiInputBase-input': {
                padding: 0,
            },
            '& .MuiInputBase-input::placeholder': {
                color: 'rgba(0, 0, 0, 0.54)',
                opacity: 1
            }
        }}
        InputProps={{
            disableUnderline: true,
        }}
        inputProps={{
            'data-testid': dataTestId as React.InputHTMLAttributes<HTMLInputElement>,
        }}
        {...otherProps}
    />
})(() => ({}));
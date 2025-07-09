import { Button, CircularProgress, styled } from '@mui/material'

type ButtonProps = {
  sx?: object
  variant?: 'contained' | 'outlined' | 'text' | 'tonal'
  loading?: boolean
  disabled?: boolean
  children: any
  fullWidth?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const ButtonStyled = styled(Button)(({ theme }) => ({
  ":disabled": {
    background: theme.palette.grey[400],
    color: theme.palette.customColors.bodyBg
  },
  ":hover": {
    background: theme.palette.primary.light,
  }
}))

const CustomButton = ({
  children,
  loading = false,
  disabled = false,
  sx,
  fullWidth = true,
  onClick,
  type = 'button',
  color = 'primary',
  startIcon,
  endIcon,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonStyled
      fullWidth={fullWidth}
      disabled={disabled || loading}
      sx={sx}
      onClick={onClick}
      type={type}
      color={color}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      {...rest}
    >
      {!loading && children}
      {loading && <CircularProgress size={18} sx={{ color: 'white' }} />}
    </ButtonStyled>
  )
}

export default CustomButton
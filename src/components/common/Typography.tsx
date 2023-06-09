import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';

interface Props extends TypographyProps {
  children?: React.ReactNode | string
};

export const H1: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h1" color={color} {...props}>{children}</Typography>;
};

H1.defaultProps = {
  children: '',
  color: 'secondary'
};

export const H2: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h2" color={color} {...props}>{children}</Typography>;
};

H2.defaultProps = {
  children: '',
  color: 'secondary'
};

export const H3: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h3" color={color} {...props}>{children}</Typography>;
};

H3.defaultProps = {
  children: '',
  color: 'secondary'
};

export const H4: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h4" color={color} {...props}>{children}</Typography>;
};

H4.defaultProps = {
  children: '',
  color: 'secondary'
};

export const H5: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h5" color={color} {...props}>{children}</Typography>;
};

H5.defaultProps = {
  children: '',
  color: 'secondary'
};

export const H6: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="h6" color={color} {...props}>{children}</Typography>;
};

H6.defaultProps = {
  children: '',
  color: 'secondary'
};

export const CAPTION: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="caption" color={color} {...props}>{children}</Typography>;
};

CAPTION.defaultProps = {
  children: '',
  color: 'secondary'
};

export const BUTTON: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="button" color={color} {...props}>{children}</Typography>;
};

BUTTON.defaultProps = {
  children: '',
  color: 'primary'
};

export const SUBTITLE1: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="subtitle1" color={color} {...props}>{children}</Typography>;
};

SUBTITLE1.defaultProps = {
  children: '',
  color: 'secondary'
};

export const SUBTITLE2: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="subtitle2" color={color} {...props}>{children}</Typography>;
};

SUBTITLE2.defaultProps = {
  children: '',
  color: 'secondary'
};

export const BODY1: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="body1" color={color} {...props}>{children}</Typography>;
};

BODY1.defaultProps = {
  children: '',
  color: 'secondary'
};

export const BODY2: React.FC<Props> = ({ children, color, ...props }): JSX.Element => {
  return <Typography variant="body2" color={color} {...props}>{children}</Typography>;
};

BODY2.defaultProps = {
  children: '',
  color: 'secondary'
};

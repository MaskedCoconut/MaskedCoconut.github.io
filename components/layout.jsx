import styles from './layout.module.css';
import { Container } from '@mui/material';


export default function Layout({ children }) {
    return <Container>{children}</Container>;
}
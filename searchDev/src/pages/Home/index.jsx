import { useState } from 'react';
import styles from './styles.module.scss';
import { FiSearch } from 'react-icons/fi';
export function Home() {
    const [user, setUser] = useState("");

    function changeText(event) {
        setUser(event.target.value);
    };

    return (
        <div className={styles.bodyDiv}>
            <div className={styles.mainDiv}>
                <h1>Search Devs</h1>
                <div className={styles.inputDiv}>
                    <input type="text" name="gitUser" onChange={changeText} placeholder="Type the username here..." />
                    <a href={`http://localhost:3000/${user}`}>
                     <FiSearch className={styles.icon} />
                     Buscar
                   </a>
                </div>
            </div>
        </div>
    );


}
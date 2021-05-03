import React from 'react';
import { HiOutlineStar } from 'react-icons/hi'
import styles from './styles.module.scss';
import moment from 'moment'

export default function Repo(props) {
    const desc = "this repository has no description";


    return (
            <div className={styles.repoDiv}>
                <a href={`https://github.com/${props.fullName}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <h2>{props.name}</h2>
                </a>
                <span>{!props.desc ? desc : props.desc} </span>
                <div className={styles.detailsDiv}>
                    <span> <HiOutlineStar className={styles.icon} />{props.stars}</span>
                    <span>*</span>
                    <span>{moment(props.date).fromNow()}</span>
                </div>
                <div className={styles.lineDiv}>

                </div>
            </div>
    )
}
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss';
import { HiOutlineUserGroup, HiOutlineHeart, HiOutlineStar, HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiOutlineMail, HiOutlineLink } from 'react-icons/hi';
import { RiTwitterLine } from 'react-icons/ri'

import axios from 'axios';

import Repo from '../../components/repo';

export function Profile() {
    const { gitUser } = useParams("");
    const [user, setUser] = useState([]);
    const [repos, setRepos] = useState([]);

    const allStars = repos.map((repo) => repo.stargazers_count);
    const totalStars = allStars.reduce((a, b) => a + b, 0)

    //funcao para ordenar os repositorios crescente 
    function compare(a, b) {
        if (a.stargazers_count < b.stargazers_count)
            return -1;
        if (a.stargazers_count > b.stargazers_count)
            return 1;
        return 0;
    }


    useEffect(() => {
        async function getProfile() {
            try {
                const { data } = await axios.get(`https://api.github.com/users/${gitUser}`);
                setUser(data);
                const repo = await axios.get(`https://api.github.com/users/${gitUser}/repos`);
                const responseRepo = repo.data;
                setRepos((responseRepo.sort(compare).reverse()));   //depois de ordernar na ordem crescente coloca na ordem decrescente
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();

    }, [gitUser]);

    return (
        <div className={styles.bodyDiv}>

            <div className={styles.profile}>
                <div className={styles.avatarDiv}>
                    <img alt="Avatar" src={user.avatar_url} />
                </div>
                <div className={styles.infoDiv}>
                    <h1>{user.name}</h1>
                    <h2>@{user.login}</h2>
                    <p>{user.bio}</p>
                    <div className={styles.iconsDiv}>
                        <span> <HiOutlineUserGroup className={styles.icon} />
                            {user.followers} followers</span>
                        <span> <HiOutlineHeart className={styles.icon} />
                            {user.following} following</span>
                        <span> <HiOutlineStar className={styles.icon} />
                            {user.stars} {totalStars} stars</span>
                    </div>
                    <div className={styles.assistDiv} >
                        <span> <HiOutlineOfficeBuilding /><span className={styles.assistSpan}>{user.company}</span></span>
                        <span> <HiOutlineLocationMarker /><span className={styles.assistSpan}>{user.location}</span></span>
                        <span> <HiOutlineMail /><span className={styles.assistSpan}>{user.email}</span></span>
                        <span>
                            <HiOutlineLink />
                            <span className={styles.assistSpan}>
                                <a
                                    href={user.blog}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {user.blog}
                                </a>
                            </span>
                        </span>
                        <span>
                            <RiTwitterLine />
                            <span className={styles.assistSpan}>
                                <a
                                    href={`https://twitter.com/${user.twitter_username}`}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {user.twitter_username ? `@${user.twitter_username}` : ''}
                                </a>
                            </span>
                        </span>
                    </div>

                    <div className={styles.backBtn}>
                        <a href={'http://localhost:3000/'} >voltar</a>
                    </div>

                </div>

            </div>

            <div className={styles.repository}>
                {repos.map((repo) => (
                    <Repo key={repo.id} fullName={repo.full_name} name={repo.name} desc={repo.description} stars={repo.stargazers_count} date={repo.updated_at} />
                ))}

            </div>

        </div>
    );


}
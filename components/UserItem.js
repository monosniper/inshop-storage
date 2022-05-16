import React from 'react';
import styles from "../styles/UserItem.module.scss";

const declension = ['год', 'года', 'лет'];
function plural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

const UserItem = ({id, name, age, last_visit, isOnline}) => {
    return (
        <div className={styles.user}>
            <div className={styles.user__left}>
                <div className={styles.user__avatar}>
                    <img src="/assets/img/users/1.png" alt={name} />
                </div>
                <div className={styles.user__name}>
                    {name}
                </div>
                <div className={styles.user__age}>
                    {age} {plural(age, declension)}
                </div>
            </div>
            <div className={styles.user__visit}>
                {isOnline ? 'Сейчас онлайн' : 'Последний визит: ' + last_visit.toLocaleString()}
            </div>
        </div>
    );
};

export default UserItem;
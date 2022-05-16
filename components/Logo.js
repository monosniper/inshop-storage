import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

const Logo = (props) => {
    return (
        <Link href={'/'}>
            <Image
                width={props.width ? props.width : 230}
                height={props.height ? props.height : 40}
                alt={process.env.NEXT_PUBLIC_APP_NAME}
                src={'/assets/img/logo.png'}
            />
        </Link>
    );
};

export default Logo;
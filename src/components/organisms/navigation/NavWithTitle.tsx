import { SiteTitle } from "@/components/molecules/title/SiteTitle";
import { FlexibleMenuBar } from "@/components/molecules/navigation-menu/FlexibleMenuBar";
import { useState } from "react";

interface NavWithTitleProps {
    title: string;
}

export const NavWithTitle = ({ title }: NavWithTitleProps) => {

    const props = {
        title,
    };

    return <NavWithTitleView {...props} />;
};

export const NavWithTitleView = ({ title }: any) => {

    return (
        <div className="flex flex-row items-center justify-center space-x-8 p-4">
            <SiteTitle title={title} />
            <FlexibleMenuBar/>
        </div>
    );
};


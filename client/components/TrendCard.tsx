import React from "react";

const TrendCard=()=> {
    return(
        <>
        <div className="flex flex-row w-[350px] h-[70px] p-[7px] m-[10px] bg-[#f9f9f9] shadow-md rounded-s text-ellipsis overflow-clip">
        <img className="w-[50px] h-[50px] p-[2px] rounded-sm" src="tempCardImg.jpg" alt="" />
            <div>
                <p className="left-[1545px] top-[666px] font-light text-sm p-[3px] text-black">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur repudiandae reprehenderit, corrupti praesentium modi iste! Aperiam accusamus, ex illo tenetur ratione doloribus et voluptas ducimus deleniti suscipit, veritatis sunt ullam?</p>
            </div>
        </div>
        </>
    );
}

export default TrendCard;
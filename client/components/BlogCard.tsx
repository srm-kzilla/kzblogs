import React from "react";

const BlogCard=()=>{
    return(
        <>
        <div className="w-[400px] h-auto p-[5px] m-[25px] bg-[#f5f5f5] shadow-lg rounded-3xl">
            <img className="w-auto h-auto p-[5px] rounded-3xl" src="tempCardImg.jpg" alt="" />
            <div>
                <h5 className="p-[5px] text-3xl font-semibold text-[#04A0E3]">Card title</h5>
                <p className="font-light text-xl tetx-black">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur repudiandae reprehenderit, corrupti praesentium modi iste! Aperiam accusamus, ex illo tenetur ratione doloribus et voluptas ducimus deleniti suscipit, veritatis sunt ullam?</p>
            <a href="#" className="p-[2px] text-kz-orange text-sm hover:text-[#000000]">Read More</a>
            </div>
        </div>
            
        </>
    );
}

export default BlogCard;
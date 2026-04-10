import { useParams } from "react-router";
import { useState } from "react";

function Detail() {
    const { id } = useParams();

    return <>{id}</>;
}

export default Detail;
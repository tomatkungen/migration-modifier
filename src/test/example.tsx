import React from "react";
// import * as React from "react";
import { Box, Button as Buttons } from "@mui/material"
import * as MUI from "@mui/material"
import {map} from "lodash"

type MyFunction = {
    label: string;
}

export const MyFunction = ({ label }: MyFunction) => {
    const myLoop = [1,2,3,4].map((n) => n)

    const apa = map([1,2,3], (n) => n * 2);

    return (
        <>
            <MUI.Box>
                <Box>{apa.join(', ')}</Box>
                <Buttons>{label}</Buttons>
            </MUI.Box>
            <Box>
                {label} {` ${myLoop.join(', ')} `}
                <Buttons>{label}</Buttons>
            </Box>
        </>
    )
}
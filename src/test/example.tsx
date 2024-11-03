import React from "react";
// import * as React from "react";
import { Box, Button as Buttons } from "@mui/material"
import _, { map as maps } from "lodash"
// import { filter as map } from "lodash"
// import {map} from "lodash";
import map from "lodash";
import * as Maps from "lodash";
import * as MUI from "@mui/material"

type MyFunction = {
    label: string;
}

export const MyFunction = ({ label }: MyFunction) => {
    const myLoop = [1, 2, 3, 4].map((n) => n)

    const apa = _.map([1, 2, 3], (n) => n * 2);
    const apa1 = _.filter([1, 2, 3], (n) => { return n === 1 })

    const grodan = maps([1, 2, 3, 4], (m) => m * 2)
    // const grodan2 = map([4, 3, 2, 1], (i) => i * 2);
    const grodan2 = map.map([4, 3, 2, 1], (i) => i * 2)

    const grodan1 = Maps.map([], () => { });
    const grodan3 = Maps.filter([], () => { });

    return (
        <>
            <MUI.Box>
                <Box>{grodan.join(', ')}</Box>
                <Box>{grodan1.join(', ')}</Box>
                <Box>{apa.join(', ')}</Box>
                <Box>{apa1}</Box>
                <Buttons>{label}</Buttons>
            </MUI.Box>
            <Box>
                {label} {` ${myLoop.join(', ')} `}
                <Buttons>{label}</Buttons>
            </Box>
        </>
    )
}
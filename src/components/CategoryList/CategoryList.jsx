import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCategoryListAPI } from 'service/axios/axios';


export const CategoryList = () => {
    const { categoryName } = useParams();
    const [value, setValue] = useState(0);
    const [mapArray, setMapArray] = useState([]);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    getCategoryListAPI()
    const arr = getCategoryListAPI()
    console.log(arr)

    const fullCategoryList = ["Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian"];


    useEffect(() => {
        if (fullCategoryList.length === 0) return;

        setMapArray([...fullCategoryList]);

        const idx = fullCategoryList.findIndex(e => {
            return e.toLowerCase() === categoryName;
        });

        if (idx !== -1) {
            setValue(idx);
        }
    }, [ categoryName]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/categories/${event.target.textContent}`);
    };

    const items = mapArray.map((e, index) => (
        <Tab
            label={e.toLowerCase()}
            key={index}
            sx={{
                padding: '0',
                paddingBottom: '28px',
                color: '#BDBDBD',
                '&.Mui-selected': {
                    color: '#8BAA36',

                },
            }}
        />
    ));
    const onMouseEnter = () => {
        setFlag(true);
    };
    const onMouseLeave = () => {
        setFlag(false);
    };

    return (
        <Box
            sx={{ maxWidth: '100%', bgcolor: 'transparent' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Tabs
                onChange={handleChange}
                value={value}
                variant="scrollable"
                scrollButtons={true}
                aria-label="scrollable auto tabs example"
                sx={{
                    '& .MuiTabs-scroller': {
                        '& .css-1aquho2-MuiTabs-indicator': { backgroundColor: '#8BAA36' },
                        '& .css-ttwr4n': { backgroundColor: '#8BAA36' },
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                    '& .MuiTabs-flexContainer': {
                        gap: '55px',
                        '& :hover': {
                            color: '#8BAA36',
                        },
                    },

                    '& .MuiTab-root': {
                        textTransform: 'capitalize',
                        minWidth: 'unset',
                        fontSize: '18px',
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        lineHeight: '18px',
                        borderColor: '#8BAA36',

                    },

                    '& svg': {
                        opacity: `${flag ? 1 : 0}`,
                        stroke: '#8BAA36',
                        strokeWidth: '3px',
                        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                }}
            >
                {items}
            </Tabs>
        </Box>
    );
};
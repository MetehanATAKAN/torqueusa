import React, { useEffect, useState } from 'react'
import { Button, Modal, Checkbox, Input, InputNumber } from 'antd';
import datas from '../mockData.json';
import Selects from '../components/Select/select';
import { v4 as uuidv4 } from 'uuid';
import { ErrorModal } from '../components/ErrorModal';
import { useDispatch } from "react-redux"
import { getTotalSelects } from '../redux/actions';
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const HomePage = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);


    const [stockError, setStockError] = useState(false);

    const onChange = (value, label, options, selectId) => {
        console.log('changede', value, label, options, selectId);
        console.log(data);
        if (value) {
            const newOptions = options.filter(item => item.id !== value);
            setSelects(s => s.map(data => {
                // seçilen selectin id si ile eşleştirme yapıyorum ve bulduğum selectin seçili itemine seçtiğim itemi atıyorum
                if (data.id === selectId) {
                    data.selectedItems = label;
                    data.options = options;
                }
                else data.options = newOptions; // tüm selectlerin opsiyonlarına filtrelenmiş olan opsiyonları atıyorum
                return data
            }))
        }
    }

    const onClear = (item, selectId) => {
        console.log(item, selectId);
        const newSelects = selects.map(data => {
            if (data.id === selectId) data.selectedItems = undefined;
            const x = [...data.options, item];
            console.log(x);
            return { ...data, options: x }
        })
        console.log(newSelects);
        setSelects(newSelects);
    }


    const [selects, setSelects] = useState([
        {
            id: uuidv4(),
            options: data,
            onChange: onChange,
            selectedItems: undefined,
        },
        {
            id: uuidv4(),
            options: data,
            onChange: onChange,
            selectedItems: undefined,
        },
        {
            id: uuidv4(),
            options: data,
            onChange: onChange,
            selectedItems: undefined,
        },
        {
            id: uuidv4(),
            options: data,
            onChange: onChange,
            selectedItems: undefined,
        },
        {
            id: uuidv4(),
            options: data,
            onChange: onChange,
            selectedItems: undefined,
        },
    ])

    const counterValueControl = (select,totalCounterValue) => {
        console.log(select,totalCounterValue);
        const itemCounterValue = select.selectedItems.counterValue;
        const selectedItemId = select.selectedItems.id;
        console.log(itemCounterValue);
        if(select.selectedItems.stok_adet > 0) {
            if(itemCounterValue > totalCounterValue) {
                setStockError(true);
                
                const newOptions = select.options.map(opt => {
                    if (opt.id === selectedItemId) opt.counterValue = totalCounterValue;
                    return opt;
                })
                setSelects(s => s.map(data => {
                    if (data.id === select.id) {
                        data.selectedItems.counterValue = totalCounterValue;
                        data.options = newOptions;
                    }
                    return data;
                }))
            }
        }
    }

    const counterChange = (type, select, e) => {
        console.log(type, select,e);

        const selectedItemId = select.selectedItems.id;

        let totalCounterValue = 0;
        select.selectedItems.m_stok_diger_bilgiler.map(data => totalCounterValue += data.stok_adet);

        

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.counterValue = type === 'decrease' ? opt.counterValue - 1 : type === 'increase' ? opt.counterValue + 1 : e;
            return opt;
        })
        setSelects(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.counterValue = type === 'decrease' ? data.selectedItems.counterValue - 1 : type === 'increase' ? data.selectedItems.counterValue + 1 : e;
                data.options = newOptions;
            }
            return data;
        }))
        console.log(select.selectedItems.counterValue);
        counterValueControl(select,totalCounterValue)
    }

    const changeBoxQuantity = (value, label, options, selectId, select) => {
        console.log('box quantity', value, label, options, selectId, select);

        const selectedItemId = select.selectedItems.id;

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.selectedBoxQuantity = label;
            return opt;
        })

        setSelects(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.selectedBoxQuantity = label;
                data.options = newOptions;
            }
            return data;
        }))
    }

    const changeBackOrder = (select) => {
        console.log(select);

        const selectedItemId = select.selectedItems.id;

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.checkAddBackOrder = !opt.checkAddBackOrder;
            return opt;
        })
        setSelects(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.checkAddBackOrder = !data.selectedItems.checkAddBackOrder;
                data.options = newOptions;
            }
            return data;
        }))
        // setSelects(s => s.map(data => {
        //     if (data.id === select.id) {
        //         data.selectedItems.checkAddBackOrder = !data.selectedItems.checkAddBackOrder;
        //     }
        //     return data
        // }))
    }

    //back order text area değişiminde item a ait olan texti güncelleme
    const changeBackOrderText = (e, select) => {
        console.log('text area', select, e.target.value);
        const textValue = e.target.value;
        const selectedItemId = select.selectedItems.id;

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.addBackOrderText = textValue;
            return opt;
        })
        setSelects(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.addBackOrderText = textValue;
                data.options = newOptions;
            }
            return data;
        }))
    }

    const changeCheckBox = (select) => {

        const selectedItemId = select.selectedItems.id;

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.checkAddBox = !opt.checkAddBox;
            return opt;
        })

        setSelects(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.checkAddBox = !data.selectedItems.checkAddBox;
                data.options = newOptions;
            }
            return data;
        }))

        // setSelects(s => s.map(data => {
        //     if (data.id === select.id) {
        //         data.selectedItems.checkAddBox = !data.selectedItems.checkAddBox;
        //     }
        //     return data
        // }))
    }

    const selectItemInfo = (select) => {
        if (select.selectedItems) {// seçili item var mı kontrolü
            console.log('var', select.selectedItems);
            if (select.selectedItems.checkAddBox && select.selectedItems.selectedBoxQuantity) {
                return (
                    <div className='select-item-info'>
                        {
                            select.selectedItems.m_stok_diger_bilgiler.map(data => (
                                <div> {data.yer_baslik} : <span> {data.stok_adet} </span> boxes in stock </div>
                            ))
                        }
                    </div>
                )
            }
            else {
                return (
                    <div className='select-item-info'>
                        {
                            select.selectedItems.m_stok_diger_bilgiler.map(data => (
                                <div> 
                                    {data.yer_baslik} :
                                    {
                                        data.stok_adet === 0
                                        ? `is out of stocks`
                                        : <> <span> {data.stok_adet} pcs in stock </span>  </>
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }

        }
    }

    const exstraDataEntry = (select) => {
        if (select.selectedItems) {// seçili item var mı kontrolü
            console.log('var', select.selectedItems);
            console.log(select);

            let totalCounterValue = 0;
            select.selectedItems.m_stok_diger_bilgiler.map(data => totalCounterValue += data.stok_adet);
            console.log('total', totalCounterValue);
            return (

                <div className='select-extra-info'>
                    <div className='counter'>
                        <div>
                            <InputNumber
                                value={select.selectedItems.counterValue === null ? 0 :select.selectedItems.counterValue }
                                addonBefore={<Button disabled={select.selectedItems.counterValue === 0 && true} type='primary' style={{ cursor: 'pointer' }} onClick={() => counterChange('decrease', select)}>-</Button>}
                                addonAfter={<Button type='primary' style={{ cursor: 'pointer' }} onClick={() => counterChange('increase', select)}>+</Button>}
                                controls={false}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onPaste={(event) => event.preventDefault()}
                                onChange={(e) => counterChange('default', select, e)}
                                // max={totalCounterValue}
                            />
                        </div>

                        <div className={select.selectedItems.stok_adet === 0 ?'select-item-info no-stock' :'select-item-info'}>

                            {
                                select.selectedItems.checkAddBox && select.selectedItems.selectedBoxQuantity
                                ?select.selectedItems.stok_adet === 0
                                    ? <div className='no-stock'> {select.selectedItems.counterValue} pcs will be added to your backorder list  </div>
                                    : select.selectedItems.m_stok_diger_bilgiler.map((data, index) => (
                                        <div>
                                            <span>
                                                {
                                                    index === 0
                                                        ? (data.stok_adet - select.selectedItems.counterValue) >= 0 ? select.selectedItems.counterValue : data.stok_adet
                                                        : (select.selectedItems.counterValue - select.selectedItems.m_stok_diger_bilgiler[index - 1].stok_adet) > 0 ? (select.selectedItems.counterValue - select.selectedItems.m_stok_diger_bilgiler[index - 1].stok_adet) : 0
                                                }
                                            </span>
                                             boxes from {data.yer_baslik}
                                        </div>
                                    ))
                                :select.selectedItems.stok_adet === 0
                                ?<div> {select.selectedItems.counterValue} pcs will be added to your backorder list  </div>
                                :select.selectedItems.m_stok_diger_bilgiler.map((data, index) => (
                                    <div>
                                        <span>
                                            {
                                                index === 0
                                                    ? (data.stok_adet - select.selectedItems.counterValue) >= 0 ? select.selectedItems.counterValue : data.stok_adet
                                                    : (select.selectedItems.counterValue - select.selectedItems.m_stok_diger_bilgiler[index - 1].stok_adet) > 0 ? (select.selectedItems.counterValue - select.selectedItems.m_stok_diger_bilgiler[index - 1].stok_adet) : 0
                                            }
                                        </span>
                                         pieces from {data.yer_baslik}
                                    </div>
                                ))
                              
                            }
                        </div>
                    </div>
                    {
                         select.selectedItems.checkAddBox && select.selectedItems.selectedBoxQuantity
                         ?<div>
                           <del> {`$ ${select.selectedItems.stok_satis}`}</del>
                           <span> {select.selectedItems.selectedBoxQuantity.box_price} </span>
                         </div>
                         :<div>
                            <span>{`$ ${select.selectedItems.stok_satis}`}</span>
                         </div>
                    }
                    {
                        select.selectedItems.isAddBox && (
                            <div className='add-item'>
                                <div> <Checkbox checked={select.selectedItems.checkAddBox} onChange={() => changeCheckBox(select)} >Add Box ?</Checkbox> </div>
                                <div>
                                    {
                                        select.selectedItems.checkAddBox && (
                                            <Selects
                                                options={
                                                    Object.values(select.selectedItems.productBoxQuantities).map((data, index) => (
                                                        {
                                                            value: index,
                                                            label: `${data.boxkayit_kutuadet} pcs @ $${data.box_fiyat} ea`,
                                                            box_price: data.box_fiyat,
                                                            box_quantity: data.boxkayit_kutuadet
                                                        }
                                                    ))
                                                }
                                                selectId={select.id}
                                                selectedItems={select.selectedItems.selectedBoxQuantity}
                                                onChange={(value, label, options, selectId) => changeBoxQuantity(value, label, options, selectId, select)}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        select.selectedItems.isAddBackOrder && (
                            <div className='add-item'>
                                <div> <Checkbox checked={select.selectedItems.checkAddBackOrder} onChange={() => changeBackOrder(select)} >Add Backorder</Checkbox> </div>
                                {
                                    select.selectedItems.checkAddBackOrder && (
                                        <div>
                                            <TextArea value={select.selectedItems.addBackOrderText} onChange={(e) => changeBackOrderText(e, select)} rows={4} autoSize={{ minRows: 1, maxRows: 2 }} placeholder='note' />
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }
                </div>
            )
        }
    }

    const addToCart = () => {
        dispatch(getTotalSelects(selects));
        setTimeout(() => {
            navigate('/basket');
            setOpen(false);
        }, 2000);
    }
    console.log(selects);
    useEffect(() => {
        const option = async () => {
            const x = await datas.items.map(item => (
                {
                    ...item,
                    value: item.id,
                    label: `${item.full_name} Price:$ ${item.m_stok_diger_bilgiler[0].stok_satis}`,
                    isAddBox: item.productBoxQuantities ? true : false,
                    checkAddBox: false,
                    isAddBackOrder: item.stok_adet > 0 ? false : true,
                    checkAddBackOrder: false,
                    addBackOrderText: '',
                    selectedBoxQuantity: undefined,
                    counterValue: 0
                }
            ));
            setData(x);
            setSelects(s => s.map(data => {
                data.options = x;
                return data
            }))
        }
        option();
    }, [])
    
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Enter SKU's
            </Button>
            <Modal
                title="Enter SKU's"
                centered
                open={open}
                width={'70%'}
                onCancel={() => setOpen(false)}
                footer={
                    <>
                        <Button type='primary' onClick={addToCart}>
                            Add to Cart
                        </Button>
                    </>
                }
            >
                <>
                    {
                        selects.map(sel => (
                            <div className='selects'>
                                <div className='selects-info'>
                                    <Selects
                                        options={sel.options}
                                        onChange={sel.onChange}
                                        onClear={onClear}
                                        selectId={sel.id}
                                        selectedItems={sel.selectedItems}
                                    />
                                    {
                                        selectItemInfo(sel)
                                    }
                                </div>
                                {
                                    exstraDataEntry(sel)
                                }
                            </div>
                        ))
                    }
                </>
            </Modal>
            {
                stockError && (
                    <ErrorModal title={'Error'} content={'The quantity you entered exceeds the stock quantity.'} setShowModal={setStockError}/>
                )
            }
        </>
    )
}

export default HomePage
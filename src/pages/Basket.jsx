import React, { useEffect, useState } from 'react'
import Header from '../components/Header/header'
import { useSelector } from 'react-redux';
import { Button, InputNumber } from 'antd';
import { ErrorModal } from '../components/ErrorModal';

const Basket = () => {

    const { selects } = useSelector(state => state.totalSelects);
  
    const [basketDatas, setBasketDatas] = useState([]);
    const [stockError, setStockError] = useState(false);

    const [cartTotals, setCartTotals] = useState(0);

  

    const counterValueControl = (select, totalCounterValue) => {
        const itemCounterValue = select.selectedItems.counterValue;
        const selectedItemId = select.selectedItems.id;
      
        if (select.selectedItems.stok_adet > 0) {
            if (itemCounterValue > totalCounterValue) {
                setStockError(true);

                const newOptions = select.options.map(opt => {
                    if (opt.id === selectedItemId) opt.counterValue = totalCounterValue;
                    return opt;
                })
                setBasketDatas(s => s.map(data => {
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
       
        const selectedItemId = select.selectedItems.id;

        let totalCounterValue = 0;
        select.selectedItems.m_stok_diger_bilgiler.map(data => totalCounterValue += data.stok_adet);

        const newOptions = select.options.map(opt => {
            if (opt.id === selectedItemId) opt.counterValue = type === 'decrease' ? opt.counterValue - 1 : type === 'increase' ? opt.counterValue + 1 : e;
            return opt;
        })
        setBasketDatas(s => s.map(data => {
            if (data.id === select.id) {
                data.selectedItems.counterValue = type === 'decrease' ? data.selectedItems.counterValue - 1 : type === 'increase' ? data.selectedItems.counterValue + 1 : e;
                data.options = newOptions;
            }
            return data;
        }))
        counterValueControl(select, totalCounterValue)
    }

    const subTotal = (select) => {
        const unitPrice = select.selectedItems.selectedBoxQuantity ? Number(select.selectedItems.selectedBoxQuantity.box_price) : Number(select.selectedItems.stok_satis);
        const counterValue = select.selectedItems.counterValue;
        return (unitPrice * counterValue).toFixed(2);
    }

    const cartTotal = () => {
        let total = 0 ;
    
        basketDatas.map(select => {
            const unitPrice = select.selectedItems.selectedBoxQuantity ? Number(select.selectedItems.selectedBoxQuantity.box_price) : Number(select.selectedItems.stok_satis);
            const counterValue = select.selectedItems.counterValue;
            total = total + Number((unitPrice * counterValue).toFixed(2));
        })
        setCartTotals(total.toFixed(2));
    }

    const deleteItem = (select) => {
        const filteredDatas = basketDatas.filter(data => data.id !== select.id);
        setBasketDatas(filteredDatas);
    }

    useEffect(() => {
        setBasketDatas(selects.filter(data => data.selectedItems && data.selectedItems.stok_adet >0 && data.selectedItems))
    }, [selects])

    useEffect(() => {
      cartTotal();
    }, [basketDatas])
    

    const cardHeaderName = ['Images', 'Product Name', 'Unit Price', 'Quantity', 'SubTotal', 'Update/Delete']
    return (
        <>
            <Header />
            <div className='container'>

                <div className='basket'>
                    <div className='items-card-info'>
                        <div className='items-card-info-header'>
                            {
                                cardHeaderName.map(head => (
                                    <span> {head} </span>
                                ))
                            }
                        </div>
                        <div className='item-card-body'>
                            {
                                basketDatas.map(select => (
                                    select.selectedItems && (
                                        <div className='item-infos'>
                                           <span className='item-info-image'> <img src={select.selectedItems.product_image} alt={select.selectedItems.full_name} width={50} height={50} /></span>
                                            <span> {select.selectedItems.full_name} </span>
                                            <span> {select.selectedItems.selectedBoxQuantity ? `$ ${select.selectedItems.selectedBoxQuantity.box_price}` :`$ ${select.selectedItems.stok_satis}`} </span>
                                            <span>
                                                <div className='counter'>
                                                    <div>
                                                        <InputNumber
                                                            value={select.selectedItems.counterValue}
                                                            addonBefore={<Button disabled={select.selectedItems.counterValue === 0 && true} type='primary' style={{ cursor: 'pointer' }} onClick={() => counterChange('decrease', select)}>-</Button>}
                                                            addonAfter={<Button type='primary' style={{ cursor: 'pointer' }} onClick={() => counterChange('increase', select)}>+</Button>}
                                                            controls={false}
                                                            onKeyPress={(event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            width={100}
                                                            onPaste={(event) => event.preventDefault()}
                                                            onChange={(e) => counterChange('default', select, e)}
                                                        // max={totalCounterValue}
                                                        />
                                                    </div>

                                                    <div className={select.selectedItems.stok_adet === 0 ? 'select-item-info no-stock' : 'select-item-info'}>

                                                        {
                                                            select.selectedItems.checkAddBox && select.selectedItems.selectedBoxQuantity
                                                                ? select.selectedItems.stok_adet === 0
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
                                                                : select.selectedItems.stok_adet === 0
                                                                    ? <div> {select.selectedItems.counterValue} pcs will be added to your backorder list  </div>
                                                                    : select.selectedItems.m_stok_diger_bilgiler.map((data, index) => (
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
                                            </span>
                                            <span> {subTotal(select)} </span>
                                            <span>
                                                <Button>Update</Button>
                                                <Button onClick={()=>deleteItem(select)}>Delete</Button>
                                            </span>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                    <div className='total-card'>
                            <div className='total-card-info total-card-header'>
                            Cart Total
                            </div>
                            <div className='total-card-info'>
                            <span>Cart Sub Total</span> <span className='total'> {cartTotals} </span>
                            </div>
                            <div className='total-card-info'>
                            <span>Grand Total</span> <span className='total'> {cartTotals} </span>
                            </div>
                            <div>
                                <Button type='primary'>Checkout</Button>
                            </div>
                    </div>
                </div>
            </div>
            {
                stockError && (
                    <ErrorModal title={'Error'} content={'The quantity you entered exceeds the stock quantity.'} setShowModal={setStockError} />
                )
            }
        </>
    )
}

export default Basket
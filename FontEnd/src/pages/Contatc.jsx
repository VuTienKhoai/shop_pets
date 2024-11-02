import { Flex, Input, Button } from 'antd'
import React from 'react'
import '../../src/pages/Admin/css/Contact.css'
export default function Contatc() {
    return (
        <div>
            <div className="mt-header"></div>
            <div className="contentContact">
                <h1 className='title_Contact'>Visit Us</h1>
                <Flex className="flagship" gap={20} vertical>
                    <Flex className="box_Contact" justify='space-between'>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Flagship Store </p>
                            <Flex vertical gap={15}>
                                <p>Tel: 123-456-7890</p>
                                <p>500 Terry Francine Street</p>
                                <p>San Francisco, CA 94158</p>
                            </Flex>
                        </div>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Store 02</p>
                            <Flex vertical gap={15}>
                                <p>Tel: 123-456-7890</p>
                                <p>500 Terry Francine Street</p>
                                <p>San Francisco, CA 94158</p>
                            </Flex>
                        </div>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Store 03</p>
                            <Flex vertical gap={15}>
                                <p>Tel: 123-456-7890</p>
                                <p>500 Terry Francine Street</p>
                                <p>San Francisco, CA 94158</p>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex className="box_Contact" justify='space-between'>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Opening Hours</p>
                            <Flex vertical gap={15}>
                                <p>Mon - Fri: 7am - 10pm</p>
                                <p>Saturday: 8am - 10pm</p>
                                <p>Sunday: 8am - 11pm</p>
                            </Flex>
                        </div>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Opening Hours</p>
                            <Flex vertical gap={15}>
                                <p>Mon - Fri: 7am - 10pm</p>
                                <p>Saturday: 8am - 10pm</p>
                                <p>Sunday: 8am - 11pm</p>
                            </Flex>
                        </div>
                        <div className="item_Contact">
                            <p className='title_itemContact'>Opening Hours</p>
                            <Flex vertical gap={15}>
                                <p>Mon - Fri: 7am - 10pm</p>
                                <p>Saturday: 8am - 10pm</p>
                                <p>Sunday: 8am - 11pm</p>
                            </Flex>
                        </div>

                    </Flex>
                </Flex>
                <Flex className='inf_Contact'>
                    <div className="title_infContact left_infContact">
                        <h1 className='title_infContactText'>Throw us a question, we promise to fetch </h1>
                    </div>
                    <div className="right_infContact box_inf_Contact">
                        <Flex className="item_rightInfContact" vertical gap={30}>
                            <Flex vertical gap={8}>
                                <p>Name</p>
                                <Input></Input>
                            </Flex>
                            <Flex vertical gap={8}>
                                <p>Email</p>
                                <Input></Input>
                            </Flex>
                            <Flex vertical gap={8}>
                                <p>NumberPhone</p>
                                <Input></Input>
                            </Flex>
                            <Flex vertical gap={8}>
                                <p>Message</p>
                                <textarea className='textara_Contact'></textarea>
                            </Flex>
                            <Flex justify='flex-end'>
                               <Flex className="box_btnSend" vertical gap={10}>
                               <Button className='btn_contactSend' defaultBg={'#019EAA'} size='large' type="primary" >
                                    <p className='text_btnContact'>Send</p>
                                </Button>
                                <p>Thanks for submitting!</p>
                               </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            </div>
        </div>
    )
}

import BookList from 'components/BookItem/BooksList';
import LibrariesList from 'components/LibrariesList/LibrariesList';
import React, { useState } from 'react';
import { TabsContainer, Tab, TabContent, TabsHeader } from './style';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/store';
import BookListOld from 'components/BookListOld/BookListOld';

function HomeTabs () {
    const [activeTab, setActiveTab] = useState(0);
    const llState = useSelector((state: RootState)=>(state.SWITCH.frontLL));

    const tabs = [
        { id: 0, label: "List of Books", content: <BookList/>},
        { id: 1, label: "List of Libraries", content: llState ==="libs" ? <LibrariesList/> : <BookListOld front={true} />}
    ];

    return (
        <TabsContainer>
            <TabsHeader>
                {tabs.map((tab) => 
                (<Tab
                   key={tab.id}
                   isActive={activeTab === tab.id}
                   onClick={() => (setActiveTab(tab.id))} 
                   >{tab.label}</Tab>
                ))}                
            </TabsHeader>
            <TabContent>
                {tabs.find((tab)=> tab.id === activeTab)?.content}
            </TabContent>
        </TabsContainer>
    )

}

export default HomeTabs;
import BookList from 'components/BookItem/BooksList';
import LibrariesList from 'components/LibrariesList/LibrariesList';
import React, { useState } from 'react';
import { TabsContainer, Tab, TabContent } from './style';

function Tabs () {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: "List of Books", content: <BookList/>},
        { id: 1, label: "List of Libraries", content: <LibrariesList/>}
    ];

    return (
        <>
            <TabsContainer>
                {tabs.map((tab) => 
                (<Tab
                   key={tab.id}
                   isActive={activeTab === tab.id}
                   onClick={() => (setActiveTab(tab.id))} 
                   >{tab.label}</Tab>
                ))}                
            </TabsContainer>
            <TabContent>
                {tabs.find((tab)=> tab.id === activeTab)?.content}
            </TabContent>
        </>
    )

}

export default Tabs;
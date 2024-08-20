import BookList from 'components/BookItem/BooksList';
import LibrariesList from 'components/LibrariesList/LibrariesList';
import React, { useState } from 'react';
import { TabsContainer, Tab, TabContent, TabsHeader } from './style';

function HomeTabs () {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: "List of Books", content: <BookList/>},
        { id: 1, label: "List of Libraries", content: <LibrariesList/>}
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
export default {
    widgets: [{
            name: 'document-list',
            options: {
                title: 'Recent projects',
                order: '_createdAt desc',
                types: ['project'],
                createButtonText: 'New Project'
            },
            layout: {
                width: 'large'
            }
        },
        {
            name: 'project-users',
            layout: {
                width: 'small'
            }
        },
        {
            name: 'netlify',
            options: {
                title: 'Netlify Deployment',
                sites: [{
                        title: 'Sanity Studio',
                        apiId: '9891ac5c-b9e0-46d5-9b11-b901142424d0',
                        buildHookId: '60380cfc2ea8a54897aec4a9',
                        name: 'hamishpearch-studio',
                    },
                    {
                        title: 'Website',
                        apiId: '24f99cc8-f028-4288-9949-c653e8f8abdf',
                        buildHookId: '603926571fb69800800cfc0c',
                        name: 'hamishpearch-web'
                    }
                ]
            }
        },
    ]
}
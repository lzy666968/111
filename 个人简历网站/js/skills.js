
document.addEventListener('DOMContentLoaded', () => {
    
    const radarChart = echarts.init(document.getElementById('skillsRadar'));
    
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['技能水平'],
            bottom: 0
        },
        radar: {
            indicator: [
                { name: '前端开发', max: 100 },
                { name: '后端开发', max: 100 },
                { name: 'UI设计', max: 100 },
                { name: '项目管理', max: 100 },
                { name: '沟通能力', max: 100 },
                { name: '团队协作', max: 100 }
            ],
            radius: '65%',
            splitNumber: 4,
            axisName: {
                color: '#666',
                fontSize: 14
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(44,181,197,0.1)', 'rgba(44,181,197,0.2)']
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(44,181,197,0.3)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(44,181,197,0.3)'
                }
            }
        },
        series: [{
            name: '技能水平',
            type: 'radar',
            data: [{
                value: [95, 80, 85, 80, 90, 85],
                name: '技能水平',
                areaStyle: {
                    color: 'rgba(44,181,197,0.6)'
                },
                lineStyle: {
                    color: 'rgba(44,181,197,0.8)'
                },
                itemStyle: {
                    color: 'rgba(44,181,197,1)'
                }
            }]
        }]
    };

    
    radarChart.setOption(option);

    
    window.addEventListener('resize', () => {
        radarChart.resize();
    });

    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.classList.add(`delay-${(index % 4) + 1}`);
    });

    
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }

    
    checkScroll();

    
    window.addEventListener('scroll', checkScroll);
}); 